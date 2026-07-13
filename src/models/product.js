const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Product = database.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    min_stock: {
        type: DataTypes.INTEGER,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'products'
}
);

Product.sync({alter:true})


module.exports = Product;