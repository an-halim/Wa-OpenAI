const db = require("../db");
const sequelize = require("sequelize");

const Log = db.define("log", {
  id: {
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  from: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  }
});


module.exports = Log;