const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');

const Category = sequelize.define('Category', {
  categoryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

module.exports = { Category };
 