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
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const chalk = require("chalk");
const fs = require("fs");
const db = require("./db");
const SyncModels = require("./models/SyncModels");
const user = require("./models/user");
const logs = require("./models/logs");
const openAiText = require("./openAI/text");
const openAiImage = require("./openAI/image");

const dotenv = require("dotenv");

dotenv.config();

const _color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};
global.color = (text, color) => _color(text, color);

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

const logger = pino().child({ level: "silent", stream: "logger" });

async function connectWA() {
  const { state, saveState } = useSingleFileAuthState("auth_info.json");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  console.log("Connecting to WhatsApp...");

  try {
    console.log("Authenticating database...");
    await db.authenticate();
    await SyncModels();
    // fake data
    await user.create({
      name: "John Doe",
      username: "johndoe",
      password: "123456",
      phone: "6281234567890",
      role: "admin",
      status: "active",
      token: "123456",
      otp: "123456",
    });
    console.log("Database connected...");
  } catch (err) {
    console.log("Unable to connect to the database:", err);
  }

  const client = waOpenAI({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["Wa-OpenAI", "Safari", "1.0.0"],
    auth: state,
  });

  store.bind(client.ev);

  client.ev.on("call", (call) => {
    console.log("CALL RECEIVED", call);
    client.sendMessage(call[0].from, {
      text: "Please don't call me, I'm busy right now.",
    });
  });

  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      const msg = chatUpdate.messages[0];
      if (msg.key.remoteJid === "status@broadcast") return;
      if (msg.key.fromMe) return;

      const pushname = msg.pushname || msg.key.participant || "Unknown";
      const number = msg.key.remoteJid;
      const checkUser = await user.findOne({
        where: {
          phone: number,
        },
      });
      if (!checkUser && number.split("@")[0] !== "6285647847468") {
        await client.sendMessage(number, {
          text: `Hi, Please register first to use this bot.\n\nhttps://wa.anhalim.tech`,
        });
        return;
      }

      const message =
        msg.message?.extendedTextMessage?.text ||
        msg.message?.conversation ||
        msg?.message?.buttonsResponseMessage?.selectedButtonId;

      const keywordGambar = [
        "gambar",
        "image",
        "foto",
        "photo",
        "pic",
        "img",
        "picture",
      ];

      let slicedMessage =
        message.length > 30 ? `${message.substring(0, 30)}...` : message;

      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(slicedMessage, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${number} ]`)
      );
      await logs.create({
        from: number,
        content: slicedMessage,
      });
      const likeEmoji = "👍";
      const readEmoji = "👀";
      const cancleEmoji = "❌";

      await client.sendMessage(number, {
        react: {
          text: readEmoji, // use an empty string to remove the reaction
          key: msg.key,
        },
      });

      try {
        if (
          keywordGambar.some((word) => message.toLowerCase().includes(word))
        ) {
          const response = await openAiImage(message);
          console.log(response);
          if (!response.data.choices[0].text) {
            throw new Error("No response from OpenAI");
          }
          const image = response.data?.data[0]?.url;
          console.log(image);
          console.log(response.data.data)
          console.log(response.data)

          // send image from url
          await client.sendMessage(number, {
            url: image,
          });
        } else {
          //  openai
          const response = await openAiText(message);
          if (!response.data.choices[0].text) {
            throw new Error("No response from OpenAI");
          }
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
          // send a buttons message!
          const buttons = [
            {
              buttonId: message,
              buttonText: { displayText: "Re-generate" },
              type: 1,
            },
          ];

          const buttonMessage = {
            text: "Regenerate response if you want",
            footer: "TruemintBOT",
            buttons: buttons,
            headerType: 1,
          };

          await client.sendMessage(number, buttonMessage);
        }

        // // update user token quota
        // await user.update(
        //   {
        //     token: checkUser.token - 1,
        //   },
        //   {
        //     where: {
        //       phone: number,
        //     },
        //   }
        // );
        await client.readMessages(number, { read: true });

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
        await client.sendMessage(number, {
          react: {
            text: cancleEmoji, // use an empty string to remove the reaction
            key: msg.key,
          },
        });
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
        fs.unlinkSync(`auth_info.json`);
        connectWA();
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
        fs.unlinkSync(`auth_info.json`);
        connectWA();
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

module.exports = connectWA;
