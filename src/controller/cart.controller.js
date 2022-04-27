
const { createOrUpdate, findCartList, updateCart, deleteCart, selectAllCarts } = require('../service/cart.service');

const { cartFormatError, selectAllError } = require('../constant/err.type');

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
    async remove(ctx){
        const {ids} = ctx.request.body;
        const res = await deleteCart(ids);
        ctx.body = {
            code: 0,
            message: '购物车删除成功',
            result: res
        }
    }
    async selectAll(ctx){
        const user_id = ctx.state.user.id;
        const { checked } = ctx.request.body
        if(checked === undefined){
            console.log(checked);
            ctx.app.emit('error',selectAllError,ctx);
            return ;
        }
        const res = await selectAllCarts({ user_id,checked });
        ctx.body = {
            code: 0,
            message: checked ? '全选成功' : '取消全选成功',
            result: res
        }
    }
}

module.exports = new CartController();