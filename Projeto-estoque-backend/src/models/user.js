const database = require('../config/database');
const { DataTypes } = require('sequelize');

const User = database.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    accessKey: {
        type: DataTypes.STRING,
    },
    timeLife: {type: DataTypes.DATE},
    token : {type: DataTypes.STRING}
},
{
    tableName: 'users'
}
);

User.sync({alter:true})

module.exports = User;