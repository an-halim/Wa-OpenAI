const logs = require("./logs");
const user = require("./user");
const updateLog = require("./updateLogs");

module.exports = async function sync() {
  try {
    await logs.sync();
    await user.sync({force: true});
    await updateLog.sync();
  } catch (err) {
    console.log(err);
  }
}