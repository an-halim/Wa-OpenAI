const db = require("../db");
const sequelize = require("sequelize");

const updateLog = db.define("update_log", {
  id: {
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  }
});


module.exports = updateLog;