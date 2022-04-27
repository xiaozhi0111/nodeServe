const {Op} = require('sequelize');

const Cart = require('../model/cart.model');
const Goods = require("../model/goods.model");

class CartService {
    async createOrUpdate(user_id,goods_id){
        console.log(user_id,goods_id);
        const res = await Cart.findOne({
            where:{
                [Op.and]:{
                    user_id,
                    goods_id
                }
            }
        })
        console.log(res);
        if(res){
            await res.increment('number');
            return await res.reload();
        }else{
            return await Cart.create({goods_id,user_id});
        }
    }
    async findCartList( user_id, pageNum, pageSize ){
        console.log(user_id);
        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await Cart.findAndCountAll({
            attributes:['id','number','selected'],
            offset: offset,
            limit: pageSize * 1,
            where:{user_id:user_id},
            include: {
                model: Goods,
                as: "goods_info",
                attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
            }
        });
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
    async updateCart(params){
        // console.log(number,selected);
        const { id, number, selected } = params;
        const res = await Cart.findByPk(id);
        if(!res) return '';
        number !== undefined ? (res.number = number) : '';
        selected !== undefined ? (res.selected = selected) : '';

        await res.save()
        return res.dataValues;
    }
    async deleteCart(ids){
        const res = await Cart.destroy({
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        })

        return res;
    }
    async selectAllCarts(params){
        const { user_id, checked } = params;
        return await Cart.update({selected:checked},{where:{user_id}})
    }
}

module.exports = new CartService();