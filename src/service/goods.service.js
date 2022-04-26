
const Goods = require('../model/goods.model');
class goodsService {
    async createGoods(goods){
        const res = await Goods.create(goods);
        return res.dataValues
    }
    async updateGoods(id,goods){
        console.log(id,goods);
        const {goods_name, goods_price, goods_num, goods_img} = goods;
        const whereOpt = {id};
        const newGoods = {};

        goods_name && Object.assign(newGoods,{goods_name});
        goods_price && Object.assign(newGoods,{goods_price});
        goods_num && Object.assign(newGoods,{goods_num});
        goods_img && Object.assign(newGoods,{goods_img});

        const res = await Goods.update(newGoods,{where: whereOpt});

        return res[0] > 0 ? true : false;
    }
}
module.exports = new goodsService();