const Order = require('../model/order.model');

class OrderService {
    async createOrder(order){
        return await Order.create(order);
    }
    async findAllOrder(pageNum, pageSize, status){

        const { total, rows } = await Order.findAndCountAll({
            attributes:['goods_info', 'total', 'order_number', 'status'],
            where: {
                status
            },
            offset: (pageNum - 1) * pageSize,
            limit: pageSize * 1
        })

        return {
            pageNum,
            pageSize,
            total,
            list: rows
        }
    }
    async updateStatusOrder(id, status){
        return await Order.update({status:status},{where:{id}})
    }
}

module.exports = new OrderService();