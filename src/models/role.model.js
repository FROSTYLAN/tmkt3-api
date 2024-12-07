const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.util');

const Role = sequelize.define('Role', {
  roleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = { Role };
 