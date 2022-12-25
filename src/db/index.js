const sequelize = require("sequelize");

const db = new sequelize("railway", "root", "CuROpuAnCPquCbNIPyT5", {
  host: "containers-us-west-83.railway.app",
  dialect: "mysql",
  port: 7424,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});


module.exports = db;