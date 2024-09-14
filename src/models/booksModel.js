'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class booksModel extends Model {
        static associate(models) {
            // define association here
        }
    }

    booksModel.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pageCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        readPage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        finished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        reading: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        insertedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'booksModel',
        tableName: 'tb_books',
        timestamps: false,
    })
    return booksModel;
}
