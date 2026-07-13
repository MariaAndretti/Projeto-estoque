const database = require('../config/database');
const { DataTypes } = require('sequelize');

const StockMovement  = database.define('StockMovement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: true,
    tableName: 'stock_movements'
}
);

StockMovement.sync({alter:true})


module.exports = StockMovement;