const {createUser} =  require('../service/user.service');
class UserController {
    async register(ctx,next){
        console.log(ctx.request.body,'3333');
        const {user_name,password} = ctx.request.body;
        const res = await createUser(user_name,password);
        ctx.body  = res;
    }
    async login(ctx,next){
        ctx.body = '用户登录'
    }
}
module.exports = new UserController();