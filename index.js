const {
  default: waOpenAI,
  useSingleFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  MessageType,
} = require("@adiwajshing/baileys");
const { state, saveState } = useSingleFileAuthState(`auth.json`);
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const chalk = require("chalk");
const { Configuration, OpenAIApi } = require("openai");

const _color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};
global.color = (text, color) => _color(text, color);

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

async function connectWA() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);

  const client = waOpenAI({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["Wa-OpenAI", "Safari", "1.0.0"],
    auth: state,
  });

  store.bind(client.ev);

  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      const msg = chatUpdate.messages[0];
      if (msg.key.remoteJid === "status@broadcast") return;
      if (msg.key.fromMe) return;

      const pushname = msg.pushname || msg.key.participant || "Unknown";
      const number = msg.key.remoteJid;
      const message = msg.message.extendedTextMessage.text;
      let slicedMessage =
        message.length > 30 ? `${message.substring(0, 30)}...` : message;

      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(slicedMessage, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${number} ]`)
      );
      const likeEmoji = "👍";
      const readEmoji = "👀";


      await client.sendMessage(number, {
        react: {
          text: readEmoji, // use an empty string to remove the reaction
          key: msg.key,
        },
      });

      try {
        //  openai
        const keyopenai = "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";
        const configuration = new Configuration({
          apiKey: keyopenai,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: message,
          temperature: 0.3,
          max_tokens: 2000,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        });
        await client.sendMessage(number, {
          react: {
            text: likeEmoji, // use an empty string to remove the reaction
            key: msg.key,
          },
        });
        client.sendMessage(
          number,
          { text: response.data.choices[0].text },
          { quoted: msg }
        );

        // logs for succes reply
        console.log(
          chalk.black(chalk.bgWhite("[ LOGS ]")),
          color(
            response.data.choices[0].text.trim().substring(0, 10) + "...",
            "turquoise"
          ),
          chalk.magenta("To"),
          chalk.green(pushname),
          chalk.yellow(`[ ${number} ]`)
        );
      } catch (err) {
        console.log(err);
        client.sendMessage(
          number,
          { text: "Error, Please Try Again Later" },
          { quoted: msg }
        );
      }
    } catch (err) {
      console.log(err);
    }
  });

  // Handle error
  const unhandledRejections = new Map();
  process.on("unhandledRejection", (reason, promise) => {
    unhandledRejections.set(promise, reason);
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
  });
  process.on("rejectionHandled", (promise) => {
    unhandledRejections.delete(promise);
  });
  process.on("Something went wrong", function (err) {
    console.log("Caught exception: ", err);
  });

  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        connectWA();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        connectWA();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log(
          "Connection Replaced, Another New Session Opened, Please Close Current Session First"
        );
        process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(
          `Device Logged Out, Please Delete Session file and Scan Again.`
        );
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        connectWA();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        connectWA();
      } else {
        console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        connectWA();
      }
    } else if (connection === "open") {
      console.log("Bot conneted to server");
    }
  });

  client.ev.on("creds.update", saveState);

  return client;
}

connectWA();
