const Router = require('koa-router');

const {userValudator, verfiyUser, crpytPassword, verifyLogin} = require('../middleware/user.middleware');
const router = new Router({prefix:'/users'});

const {register, login} = require('../controller/user.controller');

//注册接口
router.post('/register', userValudator, verfiyUser, crpytPassword, register);
router.post('/login' ,verifyLogin, login);

module.exports = router;