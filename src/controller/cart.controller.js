
const { createOrUpdate, findCartList, updateCart } = require('../service/cart.service');

const {cartFormatError} = require('../constant/err.type');

class CartController {
    async add(ctx){
        // 1、获取参数
        const user_id = ctx.state.user.id;
        const goods_id = ctx.request.body.goods_id;
        // 2、操作数据库
        const res = await createOrUpdate(user_id,goods_id);
        // 3、返回结果
        ctx.body = {
            code: 0,
            message: '添加数据库成功',
            result: res,
        }
    }
    async findAll(ctx){
        const { pageNum, pageSize } = ctx.request.query;
        const user_id = ctx.state.user.id;
        const res = await findCartList(user_id, pageNum, pageSize);
        ctx.body = {
            code: 0,
            message: '查询购物车列表成功',
            result: res
        }
    }
    async update(ctx){
        const { id } = ctx.request.params;
        const { number, selected } = ctx.request.body;
        if( number == undefined && selected == undefined){
            cartFormatError.message = 'number和selected不能同时为空';
            ctx.app.emit('error', cartFormatError, ctx);
            return ;
        }
        const { createdAt, updatedAt, ...res } = await updateCart({ id, number, selected });
        ctx.body = {
            code: 0,
            message: '购物车更新成功',
            result: res
        }
    }
}

module.exports = new CartController();