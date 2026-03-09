const { randomInt } = require("../utils/random")
const { load, save } = require("./taixiuData")
const { resultEmbed } = require("./taixiuEmbed")

const DEV_ROLE_ID = "1479648187328368670"

const cooldown = new Map()

// ================= BET =================

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

data.bets ??= {}

data.bets[id] = { side, money }

save(data)

return interaction.editReply("🎲 Đã đặt cược")

}

// ================= ROLL =================

async function roll(channel,economy){

const data = load()

let dice = [

randomInt(1,6),
randomInt(1,6),
randomInt(1,6)

]

let sum = dice.reduce((a,b)=>a+b)

let result = sum >= 11 ? "tai" : "xiu"

// ===== DEV RIG =====

if(data.rig){

result = data.rig
data.rig = null

}

// ===== PAYOUT =====

Object.entries(data.bets || {}).forEach(([id,bet])=>{

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

data.history ??= []

data.history.push(result)

if(data.history.length > 12){

data.history.shift()

}

// ===== RESET =====

data.bets = {}

save(data)

// ===== SEND EMBED =====

const embed = resultEmbed(dice,sum,result,data.history)

channel.send({embeds:[embed]})

}

// ================= COOLDOWN =================

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

// ================= DEV =================

function rig(side){

const data = load()

data.rig = side

save(data)

}

async function rigCommand(interaction){

if(!interaction.member.roles.cache.has(DEV_ROLE_ID)){

return interaction.reply({
content:"❌ Không có quyền",
ephemeral:true
})

}

const side = interaction.options.getString("side")

rig(side)

return interaction.reply("🧪 Đã bẻ cầu")

}

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
rig,
rigCommand,
toggle

}
