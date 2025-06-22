const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Example = sequelize.define('example', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    imagePath: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = Example;