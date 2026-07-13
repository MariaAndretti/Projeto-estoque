const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Category = database.define('Category', {
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
    }
},
{
    tableName: 'categories'
}
);

Category.sync({alter:true})

module.exports = Category;