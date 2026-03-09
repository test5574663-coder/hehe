const fs = require("fs")
const { randomInt } = require("../utils/random")

const path = "./src/data/taixiu.json"

// ================= LOAD =================

function load(){

if(!fs.existsSync(path)){

return {
bets:{},
history:[]
}

}

return JSON.parse(fs.readFileSync(path))

}

// ================= SAVE =================

function save(data){

fs.writeFileSync(path,JSON.stringify(data,null,2))

}

// ================= BET =================

async function bet(interaction,economy){

const id = interaction.user.id

const side = interaction.options.getString("side")
const money = interaction.options.getInteger("money")

const player = economy.getUser(id)

if(player.vnd < money){

return interaction.reply({content:"❌ Không đủ tiền",ephemeral:true})

}

const data = load()

if(!data.bets) data.bets = {}

data.bets[id] = {
side,
money
}

save(data)

return interaction.reply("🎲 Đã đặt cược thành công")

}

// ================= ROLL =================

function roll(client,economy){

const data = load()

const dice = [
randomInt(1,6),
randomInt(1,6),
randomInt(1,6)
]

const sum = dice.reduce((a,b)=>a+b)

const result = sum >= 11 ? "tai" : "xiu"

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

// ================= HISTORY =================

if(!data.history) data.history = []

data.history.push(result)

if(data.history.length > 12){

data.history.shift()

}

// ================= RESET BET =================

data.bets = {}

save(data)

}

module.exports = {
bet,
roll
}
