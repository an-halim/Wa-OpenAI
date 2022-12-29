const express = require("express");
const connectWA = require("./index.js");
const socketIo = require("socket.io");
const app = express();
const server = require("http").createServer(app);
const io = socketIo(server);

const router = require("./routes/routes.js");

async function startAPI() {
  console.log("Starting API...");
  let client = await connectWA();

  io.on("connection", (socket) => {
    console.log("New client connected");

    client.ev.on('connection.update', async (update) => {
      update?.qr ? console.log(update?.qr) : null;
      update?.qr ? socket.emit('qr', update?.qr) : null;
      update?.connection === 'open' ? socket.emit('connection', update?.connection) : null;

      socket.on("message", (message) => {
        console.log(message);
        socket.emit("message", message);
      });
    })
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', router);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  server.listen(5000, () => {
    console.log("Example app listening on port 3000!");
  });
}

startAPI();
// module.exports = startAPI;
