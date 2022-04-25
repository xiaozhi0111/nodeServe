const Router = require('koa-router');

const router = new Router({prefix:'/users'});

const {register,login} = require('../controller/user.controller');

//注册接口
router.post('/register',register);
router.post('/login',login);

module.exports = router;