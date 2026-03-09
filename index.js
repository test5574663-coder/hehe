require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

/* =========================
   MODULE IMPORT
========================= */

const economy = require("./core/economy");

const fishing = require("./fishing/fishing");

const taixiu = require("./taixiu/taixiu");

const rpg = require("./rpg/rpg");

/* =========================
   CLIENT
========================= */

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

/* =========================
   READY
========================= */

client.once("ready", () => {

  console.log(`Bot online: ${client.user.tag}`);

});


/* =========================
   COMMAND HANDLER
========================= */

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  const args = message.content.split(" ");
  const cmd = args[0].toLowerCase();

  /* ===== FISHING ===== */

  if (cmd === "!fish") {

    fishing.run(client, message, args);

  }

  /* ===== TAIXIU ===== */

  if (cmd === "!taixiu") {

    taixiu.run(client, message, args);

  }

  /* ===== RPG ===== */

  if (cmd === "!profile") {

    rpg.profile(client, message);

  }

  if (cmd === "!boss") {

    rpg.boss(client, message);

  }

  if (cmd === "!dungeon") {

    rpg.dungeon(client, message);

  }

  if (cmd === "!pvp") {

    rpg.pvp(client, message, args);

  }

});


/* =========================
   LOGIN
========================= */

client.login(process.env.TOKEN);