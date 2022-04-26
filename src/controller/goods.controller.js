const path = require('path');

const { createGoods, updateGoods, removeGoods, restoreGoods,findGoods } = require('../service/goods.service');
const { fileUploadError, unSupposedFileType, publishGoodsError, invalidGoodsId } = require('../constant/err.type');
class GoodsController {
    async upload(ctx,next){
        const {file} = ctx.request.files;
        const filesType = ['image/jpeg','image/png'];
        if(file){
            if (!filesType.includes(file.type)){
                return ctx.app.emit('error',unSupposedFileType,ctx);
            }
            ctx.body = {
                code:0,
                message: '图片上传成功',
                result:{
                    goods_img: path.basename(file.path)
                }
            }
        }else{
            return ctx.app.emit('error', fileUploadError, ctx);
        }
    }
    async create(ctx,next){
        try {
            const {createdAt,updatedAt, ...res} = await createGoods(ctx.request.body);
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', publishGoodsError, ctx);
        }
    }
    async update(ctx, next){
        try {
            const res = await updateGoods(ctx.params.id,ctx.request.body);
            if(res){
                ctx.body = {
                    code: 0,
                    message: '修改成功',
                    result: ''
                }
            }else{
                return ctx.app.emit('error', invalidGoodsId, ctx);
            }
        } catch (error) {
            console.error(error);
        }
        
    }
    async remove(ctx, next){
        try {
            const res = await removeGoods(ctx.params.id);
            if(res){
                ctx.body = {
                    code: 0,
                    message: '商品下架成功',
                    result: ''
                }
            }else{
                return ctx.app.emit('error',invalidGoodsId,ctx);
            }
        } catch (error) {
            console.error(error);
        }
    }
    async restore(ctx,next){
        try {
            const res = await restoreGoods(ctx.params.id);
            if(res){
                ctx.body = {
                    code: 0,
                    message: '商品上架成功',
                    result: ''
                }
            }else{
                return ctx.app.emit('error',invalidGoodsId,ctx);
            }
        } catch (error) {
            console.error(error);
        }
    }
    async findAll(ctx,next){
        const {pageNum = 1,pageSize = 10} = ctx.request.query;
        const res = await findGoods(pageNum,pageSize);
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res
        }
    }
}

module.exports = new GoodsController();