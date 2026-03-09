require("dotenv").config()

const express = require("express")
const { Client, GatewayIntentBits } = require("discord.js")

// ===== MODULE =====

const economy = require("./core/economy")
const fishing = require("./fishing/fishing")
const taixiu = require("./taixiu/taixiu")
const rpg = require("./rpg/rpg")
// ===== CHANNEL ID =====

const FISHING_CHANNEL = "1479330773248249907"
const TAIXIU_CHANNEL = "1479443413290975272"
const RPG_CHANNEL = "1479329833707110431"

// ===== EXPRESS SERVER (ANTI SLEEP) =====

const app = express()

app.get("/", (req,res)=>{
res.send("Bot is alive")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
console.log(`Web server running on ${PORT}`)
})

// ===== DISCORD CLIENT =====

const client = new Client({
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
})

// ===== READY =====

client.once("clientReady", ()=>{

console.log(`Bot online: ${client.user.tag}`)

})

// ===== COMMAND =====

client.on("messageCreate", async (message)=>{

if(message.author.bot) return

const args = message.content.split(" ")
const cmd = args[0].toLowerCase()

// ===== FISHING =====

if(cmd === "!fish"){

if(message.channel.id !== FISHING_CHANNEL){

return message.reply("❌ Lệnh chỉ dùng trong kênh câu cá")

}

fishing.run(client,message,args)

}

// ===== TAIXIU =====

if(cmd === "!taixiu"){

if(message.channel.id !== TAIXIU_CHANNEL){

return message.reply("❌ Lệnh chỉ dùng trong kênh tài xỉu")

}

taixiu.bet(message,economy)

}

// ===== RPG =====

if(cmd === "!profile" || cmd === "!boss" || cmd === "!dungeon"){

if(message.channel.id !== RPG_CHANNEL){

return message.reply("❌ Lệnh chỉ dùng trong kênh RPG")

}

if(cmd === "!profile") rpg.profile(message,economy)
if(cmd === "!boss") rpg.boss(message,economy)
if(cmd === "!dungeon") rpg.dungeon(message,economy)

}

})

// ===== AUTO TAIXIU ROLL =====

setInterval(()=>{

const channel = client.channels.cache.get(TAIXIU_CHANNEL)

if(!channel) return

if(taixiu.canRoll()){

taixiu.roll(channel,economy)

}

},5000)

// ===== LOGIN =====

client.login(process.env.TOKEN)

