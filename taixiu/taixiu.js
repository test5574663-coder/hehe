const fs = require("fs")
const embed = require("./taixiuEmbed")
const { randomInt } = require("../utils/random")

const path = "./src/data/taixiu.json"

// ================= LOAD =================

function load(){

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

return interaction.reply("Không đủ tiền")

}

const data = load()

data.bets[id] = {

side,
money

}

save(data)

return interaction.reply("🎲 Đã đặt cược")

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

Object.entries(data.bets).forEach(([id,bet])=>{

const player = economy.getUser(id)

if(bet.side === result){

player.vnd += bet.money

}else{

player.vnd -= bet.money

}

economy.updateUser(id,player)

})

data.history.push(result)

if(data.history.length > 10){

data.history.shift()

}

data.bets = {}

save(data)

}

module.exports = {

bet,
roll

}
