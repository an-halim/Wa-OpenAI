const db = require("../db");
const sequelize = require("sequelize");

const User = db.define("user", {
  id: {
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
  },
  status: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  otp: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = User;