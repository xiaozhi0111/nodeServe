const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/order.middleware');

const { create, findAll, updateStatus } = require('../controller/order.controller');

const router = new Router({prefix:'/order'});


//创建订单
router.post('/', auth, validator({
    address_id: 'int',
    goods_info: 'string',
    total: 'string'
}), create)
//获取订单列表
router.get('/', auth, findAll);
//修改订单状态
router.patch('/:id', auth, validator({
    status: 'number'
}), updateStatus);


module.exports = router;