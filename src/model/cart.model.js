const {DataTypes} = require('sequelize');

const Goods = require('./goods.model');

const seq = require('../db/seq');

const Cart = seq.define('zd_carts',{
    user_id:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户id',
    },
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1,
        comment: '商品数量'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否选中'
    }
})

// Cart.sync({force:true});

Cart.belongsTo(Goods,{
    foreignKey:'goods_id',
    as: 'goods_info'
});

module.exports = Cart;