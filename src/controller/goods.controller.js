const path = require('path');

const { createGoods, updateGoods } = require('../service/goods.service');
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
}

module.exports = new GoodsController();