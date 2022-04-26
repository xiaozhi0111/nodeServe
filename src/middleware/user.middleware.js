const bcrypt = require('bcryptjs');
const {getUserInfo} = require('../service/user.service');
const {userFormateError,userAlreadyExited,userRegisterError,userDoesNotExist, userLoginError,invalidPasswordError} = require('../constant/err.type');

const userValudator = async (ctx,next) => {
    const {user_name,password} = ctx.request.body;
    //合法性
    if(!user_name || !password){
        console.error('用户名或密码为空',ctx.request.body);
        ctx.app.emit('error',userFormateError,ctx);
        return ;
    }
    await next();
}
const verfiyUser = async(ctx,next) => {
    const {user_name} = ctx.request.body
    //合理性
    try{
        const res = await getUserInfo({user_name});
        if(res){
            console.error('用户已经存在',{user_name});
            ctx.app.emit('error',userAlreadyExited,ctx);
            return ;
        }
    }catch(err){
        console.error('获取用户信息错误',err);
        ctx.app.emit('error',userRegisterError,ctx);
        return ;
    }
    
    await next();
}

const crpytPassword = async (ctx,next) => {
    const {password} = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password,salt);

    ctx.request.body.password = hash;

    console.log(ctx.request.body,'检验密码加密');

    await next();
}

const verifyLogin = async (ctx,next) => {
    const {user_name,password} = ctx.request.body;
    
    try {
        const res = await getUserInfo({user_name});
        if(!res){
            console.error('用户不存在',user_name);
            ctx.app.emit('error',userDoesNotExist,ctx);
            return ;
        }
        if(!bcrypt.compareSync(password,res.password)){
            ctx.app.emit('error', invalidPasswordError, ctx)
            return ;
        }
    } catch (error) {
        console.error(err,'登录出错');
        ctx.app('error',userLoginError,ctx);
        return ;
    }
    
    await next();
}


module.exports = {
    userValudator,verfiyUser,crpytPassword,verifyLogin
}