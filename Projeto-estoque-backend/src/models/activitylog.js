const database = require('../config/database');
const { DataTypes } = require('sequelize');

const ActivityLog = database.define('ActivityLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    }   
},
{
    timestamp: false,
    tableName: 'activity_logs'
}
);

ActivityLog.sync({alter:true})


module.exports = ActivityLog;