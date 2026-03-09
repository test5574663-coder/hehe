require("dotenv").config()

const express = require("express")
const { Client, GatewayIntentBits } = require("discord.js")

// ===== MODULE =====

const economy = require("./core/economy")

const fishing = require("./fishing/fishing")
const taixiu = require("./taixiu/taixiu")
const rpg = require("./rpg/rpg")

// ===== CHANNEL ID =====
const DEV_ROLE_ID = "1479648187328368670"
const FISHING_CHANNEL = "1479330773248249907"
const TAIXIU_CHANNEL = "1479443413290975272"
const RPG_CHANNEL = "1479329833707110431"

// ===== EXPRESS SERVER (ANTI SLEEP) =====

const app = express()

app.get("/", (req,res)=>{
res.send("Bot running")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
console.log("Web server running")
})

// ===== DISCORD CLIENT =====

const client = new Client({
intents:[GatewayIntentBits.Guilds]
})

client.once("clientReady", ()=>{
console.log(`Bot online: ${client.user.tag}`)
})

// ===== SLASH COMMAND =====

client.on("interactionCreate", async interaction => {

if(!interaction.isChatInputCommand()) return

const { commandName } = interaction

// ===== FISHING =====

if(commandName === "fish"){

if(interaction.channel.id !== FISHING_CHANNEL){

return interaction.reply({
content:"❌ Chỉ dùng trong kênh câu cá",
ephemeral:true
})

}

return fishing.run(interaction,economy)

}

// ===== BUY ROD =====

if(commandName === "buyrod"){

if(interaction.channel.id !== FISHING_CHANNEL){

return interaction.reply({
content:"❌ Chỉ dùng trong kênh câu cá",
ephemeral:true
})

}

return fishing.buyRod(interaction,economy)

}

// ===== TAIXIU =====

if(commandName === "taixiu"){

if(interaction.channel.id !== TAIXIU_CHANNEL){

return interaction.reply({
content:"❌ Chỉ dùng trong kênh tài xỉu",
ephemeral:true
})

}

return taixiu.bet(interaction,economy)

}

// ===== RIG (DEV) =====

if(commandName === "rig"){

return taixiu.rigCommand(interaction)

}

// ===== RPG =====

if(commandName === "profile"){

return rpg.profile(interaction,economy)

}

if(commandName === "boss"){

return rpg.boss(interaction,economy)

}

if(commandName === "dungeon"){

return rpg.dungeon(interaction,economy)

}

})

// ===== AUTO ROLL TAIXIU =====

setInterval(()=>{

const channel = client.channels.cache.get(TAIXIU_CHANNEL)

if(!channel) return

if(taixiu.canRoll()){

taixiu.roll(channel,economy)

}

},5000)

// ===== LOGIN =====

client.login(process.env.TOKEN)
