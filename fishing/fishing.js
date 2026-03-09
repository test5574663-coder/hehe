const fishList = require("./fishList")
const embed = require("./fishingEmbed")

// ================= RANDOM HELPER =================

function randomFrom(list){

return list[Math.floor(Math.random()*list.length)]

}

// ================= RANDOM FISH =================

function randomFish(){

const roll = Math.random()

if(roll < 0.55) return { ...randomFrom(fishList.common), rarity:"common" }

if(roll < 0.80) return { ...randomFrom(fishList.uncommon), rarity:"uncommon" }

if(roll < 0.92) return { ...randomFrom(fishList.rare), rarity:"rare" }

if(roll < 0.98) return { ...randomFrom(fishList.epic), rarity:"epic" }

return { ...randomFrom(fishList.mythic), rarity:"mythic" }

}

// ================= CAU CA =================

async function fish(interaction,economy){

const id = interaction.user.id

const player = economy.getUser(id)

if(player.rods <= 0){

return interaction.reply("🎣 Bạn không có cần câu")

}

const fish = randomFish()

player.rods -= 1

player.inventory.push(fish.name)

economy.updateUser(id,player)

return interaction.reply({

embeds:[embed.fishResult(fish)]

})

}

// ================= BAN CA =================

async function sell(interaction,economy){

const id = interaction.user.id

const player = economy.getUser(id)

if(!player.inventory.length){

return interaction.reply("📦 Inventory trống")

}

let vnd = 0
let gold = 0

player.inventory.forEach(item => {

const fish =

fishList.common.find(f=>f.name===item) ||
fishList.uncommon.find(f=>f.name===item) ||
fishList.rare.find(f=>f.name===item) ||
fishList.epic.find(f=>f.name===item) ||
fishList.mythic.find(f=>f.name===item)

if(!fish) return

if(fish.currency === "gold"){

gold += fish.value

}else{

vnd += fish.value

}

})

player.inventory = []

player.vnd += vnd
player.gold += gold

economy.updateUser(id,player)

return interaction.reply({

embeds:[embed.sellResult(vnd,gold)]

})

}

// ================= SHOP =================

async function shop(interaction){

return interaction.reply({

embeds:[embed.shopEmbed()]

})

}

// ================= BUY ROD =================

async function buyRod(interaction,economy){

const id = interaction.user.id

const player = economy.getUser(id)

const type = interaction.options.getInteger("rod")

const prices = {

1:50,
2:150,
3:400

}

const price = prices[type]

if(!price){

return interaction.reply("❌ Cần câu không tồn tại")

}

if(player.vnd < price){

return interaction.reply("💸 Không đủ VND")

}

player.vnd -= price
player.rods += 1

if(player.rods > 99){

player.rods = 99

}

economy.updateUser(id,player)

return interaction.reply("🛒 Bạn đã mua cần câu")

}

module.exports = {

fish,
sell,
shop,
buyRod

}
