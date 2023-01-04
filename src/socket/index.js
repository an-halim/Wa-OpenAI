module.exports = function socket(io, client) {
  console.log("Starting socket...");
  io.on("connection", (socket) => {
    console.log("New client connected");

    client.ev.on("connection.update", async (update) => {
      update?.qr ? socket.emit("qr", update?.qr) : null;
      update?.connection === "open"
        ? socket.emit("connection", update?.connection)
        : null;

      socket.on("message", (message) => {
        socket.emit("message", message);
      });
    });
    client.ev.on("messages.upsert", async (chatUpdate) => {
      const msg = chatUpdate.messages[0];
      const message =
        msg.message?.extendedTextMessage?.text ||
        msg.message?.conversation ||
        msg?.message?.buttonsResponseMessage?.selectedButtonId;

      if (!msg?.key?.fromMe) {
        socket.emit("message", msg.pushName + ": " + message);
      }
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
  });
};
