
const Address = require('../model/addr.model');

class AddrService {
    async createAddr(params){
        const res = await Address.create(params);
        return res.dataValues;
    }
    async findAllAddress(user_id){
        const res = await Address.findAll({
            attributes:['id', 'consignee', 'phone', 'address', 'is_default'],
            where:{user_id
            }});
        return res
    }
    async updataAddr(id,params){
        return await Address.update(params,{where:{id}})
    }
    async removeAddr(id){
        return await Address.destroy({where:{id}})
    }
    async setDefaultAddr(user_id,id){
        await Address.update({is_default:0},{where:{user_id}})
        return await Address.update({is_default:1},{where:{id}})

    }
}

module.exports = new AddrService();