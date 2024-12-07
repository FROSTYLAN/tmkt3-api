const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.util");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [5, 255],
      },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 1024],
      },
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = { User };
