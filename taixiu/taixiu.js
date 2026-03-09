const { randomInt } = require("../utils/random")
const { load, save } = require("./taixiuData")
const { boardEmbed } = require("./taixiuEmbed")

async function roll(channel,economy){

const data = load()

let msg = await channel.send({
embeds:[boardEmbed(data,3,"🎲 Rolling...",null)]
})

// ===== ANIMATION 3s =====

for(let i=0;i<3;i++){

let dice = [
randomInt(1,6),
randomInt(1,6),
randomInt(1,6)
]

await msg.edit({
embeds:[boardEmbed(data,3-i,"🎲 Rolling...",dice)]
})

await new Promise(r=>setTimeout(r,700))

}

// ===== FINAL RESULT =====

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

data.history.push(result)

if(data.history.length > 12){
data.history.shift()
}

data.bets = {}

save(data)

// ===== FINAL EMBED =====

await msg.edit({
embeds:[boardEmbed(data,60,result.toUpperCase(),dice)]
})

}
