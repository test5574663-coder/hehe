require("dotenv").config()

const express = require("express")
const { Client, GatewayIntentBits } = require("discord.js")

// ===== MODULES =====

const economy = require("./src/core/economy")

const fishing = require("./src/fishing/fishing")
const taixiu = require("./src/taixiu/taixiu")
const rpg = require("./src/rpg/rpg")

// ===== EXPRESS SERVER (ANTI SLEEP) =====

const app = express()

app.get("/", (req,res)=>{

res.send("Bot is running")

})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{

console.log(`Web server running on ${PORT}`)

})

// ===== DISCORD CLIENT =====

const client = new Client({

intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]

})

// ===== READY =====

client.once("clientReady", ()=>{

console.log(`Bot online: ${client.user.tag}`)

})

// ===== COMMAND HANDLER =====

client.on("messageCreate", async (message)=>{

if(message.author.bot) return

const args = message.content.split(" ")
const cmd = args[0].toLowerCase()

// ===== FISHING =====

if(cmd === "!fish"){

fishing.run(client,message,args)

}

// ===== TAIXIU BET =====

if(cmd === "!taixiu"){

taixiu.bet(message,economy)

}

// ===== RPG PROFILE =====

if(cmd === "!profile"){

rpg.profile(message,economy)

}

// ===== RPG BOSS =====

if(cmd === "!boss"){

rpg.boss(message,economy)

}

// ===== RPG DUNGEON =====

if(cmd === "!dungeon"){

rpg.dungeon(message,economy)

}

})

// ===== AUTO TAIXIU ROLL =====

setInterval(()=>{

client.guilds.cache.forEach(guild=>{

const channel = guild.channels.cache.find(c=>c.name==="taixiu")

if(!channel) return

if(taixiu.canRoll()){

taixiu.roll(channel,economy)

}

})

},5000)

// ===== LOGIN =====

client.login(process.env.TOKEN)
