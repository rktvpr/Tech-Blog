const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class User_data extends Model { }

User_data.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pword: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_data',
    }
);

module.exports = User_data;