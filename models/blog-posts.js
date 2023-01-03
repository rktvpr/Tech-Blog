const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Blog_posts extends Model { }

Blog_posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'username',
                Key: 'id',
            },
        },
        post_data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog_posts',
    }
);

module.exports = Blog_posts;