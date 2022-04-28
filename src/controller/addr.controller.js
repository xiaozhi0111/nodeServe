
const { createAddr, findAllAddress, updataAddr, removeAddr, setDefaultAddr } = require('../service/addr.service');

class AddrController {
    async create(ctx,next){
        const user_id = ctx.state.user.id;
        const { consignee, phone, address } = ctx.request.body;
        const { createdAt, updatedAt, ...res } = await createAddr({ user_id, consignee, phone, address });

        ctx.body = {
            code: 0,
            message: '添加地址成功',
            result: res
        }
    }
    async findAll(ctx,next){
        const user_id = ctx.state.user.id;
        const res = await findAllAddress(user_id);
        ctx.body = {
            code: 0,
            message: '获取地址列表成功',
            result: res
        }
    }
    async update(ctx,next){
        const id = ctx.request.params.id;
        const res = await updataAddr(id,ctx.request.body);
        ctx.body = {
             code: 0,
             message: '更新地址成功',
             result: res
        }
    }
    async remove(ctx,next){
        const id = ctx.request.params.id;
        const res = await removeAddr(id);
        ctx.body = {
             code: 0,
             message: '删除地址成功',
             result: res
        }
    }
    async setDefault(ctx, next){
        const id = ctx.request.params.id;
        const user_id = ctx.state.user.id;
        const res = await setDefaultAddr(user_id,id);
        ctx.body = {
             code: 0,
             message: '设置默认地址成功',
             result: res
        }
    }
}

module.exports = new AddrController();