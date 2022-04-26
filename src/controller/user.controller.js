const jwt = require('jsonwebtoken');

const {createUser, getUserInfo, updateById} =  require('../service/user.service');
const {userRegisterError, updatePasswordError} = require('../constant/err.type');

const {JWT_SECRET} = require('../../config/config.default');
class UserController {
    async register(ctx,next){
        // console.log(ctx.request.body,'3333');
        // 1、获取数据
        const {user_name,password} = ctx.request.body;

        // 2、操作数据库
        try{
            const res = await createUser(user_name,password);
            // 3、返回结果
            ctx.body  = {
                code:0,
                message:'用户注册成功',
                result:{
                    id:res.id,
                    user_name:res.user_name
                }
            }
        }catch(err){
            console.log(err,'err');
            ctx.app.emit('error',userRegisterError,ctx)
        }
        
    }
    async login(ctx,next){
        const {user_name} = ctx.request.body;

        // 1、获取用户信息（token的payload中，要记录id，user_name,is_admin)
        try {
            const {password, ...res} = await getUserInfo({user_name});
            ctx.body = {
                code:0,
                message:'用户登录成功',
                result:{
                    token:jwt.sign(res, JWT_SECRET, {expiresIn: '1d'})
                }
            }
        } catch (error) {
            console.error('用户登录失败',error);
        }

    }
    async changePassword(ctx,next){
        const id = ctx.state.user.id;
        const password = ctx.request.body.password;
        try {
            if(await updateById({id,password})){
                ctx.body = {
                    code:0,
                    message:'修改密码成功',
                    result:''
                }
            }
        } catch (error) {
            console.error('修改密码报错',error);
            ctx.app.emit('error',updatePasswordError,ctx)
        }
        

    }
}
module.exports = new UserController();