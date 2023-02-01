const express = require("express");
const connectWA = require("./index.js");
const socketIo = require("socket.io");
const logger = require("morgan");
const socket = require("./socket");

const app = express();
const server = require("http").createServer(app);
const io = socketIo(server);

const router = require("./routes/routes.js");

async function startAPI() {
  console.log("Starting API...");
  global.client = await connectWA();

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", router);
  app.use("*", (req, res) => {
    res.json({ status: "success", message: "Welcome to the API" });
  });

  socket(io, global.client);

  server.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on port ${process.env.PORT || 5000}!`);
  });
}

startAPI();
// module.exports = startAPI;
