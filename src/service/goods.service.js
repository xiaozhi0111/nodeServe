
const Goods = require('../model/goods.model');
class goodsService {
    async createGoods(goods){
        console.log(goods,'商品信息');
        const res = await Goods.create(goods);
        return res.dataValues
    }
}
module.exports = new goodsService();