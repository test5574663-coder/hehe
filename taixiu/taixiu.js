const fs = require("fs")
const { load, save } = require("./taixiuData")

const { randomInt } = require("../utils/random")
const { resultEmbed } = require("./taixiuEmbed")

const DEV_ROLE_ID = "1479648187328368670"

const cooldown = new Map()

// ===== LOAD DATA =====

function load(){

if(!fs.existsSync(path)){

return {
bets:{},
history:[],
enabled:true,
rig:null
}

}

const data = JSON.parse(fs.readFileSync(path))

data.bets ??= {}
data.history ??= []
data.enabled ??= true
data.rig ??= null

return data

}

// ===== SAVE DATA =====

function save(data){

fs.writeFileSync(path,JSON.stringify(data,null,2))

}

// ===== BET =====

async function bet(interaction,economy){

await interaction.deferReply()

const id = interaction.user.id
const side = interaction.options.getString("side")
const money = interaction.options.getInteger("money")

const player = economy.getUser(id)

if(player.vnd < money){

return interaction.editReply("❌ Không đủ tiền")

}

const data = load()

if(!data.enabled){

return interaction.editReply("⚠️ Tài xỉu đang tắt")

}

data.bets[id] = { side, money }

save(data)

return interaction.editReply("🎲 Đã đặt cược")

}

// ===== ROLL =====

async function roll(channel,economy){

const data = load()

const dice = [

randomInt(1,6),
randomInt(1,6),
randomInt(1,6)

]

const sum = dice.reduce((a,b)=>a+b)

let result = sum >= 11 ? "tai" : "xiu"

// ===== DEV RIG =====

if(data.rig){

result = data.rig
data.rig = null

}

// ===== PAYOUT =====

Object.entries(data.bets).forEach(([id,bet])=>{

const player = economy.getUser(id)

if(!player) return

if(bet.side === result){

player.vnd += bet.money

}else{

player.vnd -= bet.money

}

economy.updateUser(id,player)

})

// ===== HISTORY =====

data.history.push(result)

if(data.history.length > 12){

data.history.shift()

}

// ===== RESET BET =====

data.bets = {}

save(data)

// ===== SEND EMBED =====

const embed = resultEmbed(dice,sum,result,data.history)

channel.send({embeds:[embed]})

}

// ===== COOLDOWN =====

function canRoll(){

const now = Date.now()

if(!cooldown.has("roll")){

cooldown.set("roll",now)
return true

}

if(now - cooldown.get("roll") >= 60000){

cooldown.set("roll",now)
return true

}

return false

}

// ===== DEV RIG =====

async function rigCommand(interaction){

if(!interaction.member.roles.cache.has(DEV_ROLE_ID)){

return interaction.reply({
content:"❌ Không có quyền",
ephemeral:true
})

}

const side = interaction.options.getString("side")

const data = load()

data.rig = side

save(data)

return interaction.reply("🧪 Đã bẻ cầu")

}

// ===== TOGGLE =====

function toggle(){

const data = load()

data.enabled = !data.enabled

save(data)

return data.enabled

}

module.exports = {

bet,
roll,
canRoll,
rigCommand,
toggle

}

