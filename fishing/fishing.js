const fishList = require("./fishList")

// ===== FISH =====

async function run(interaction,economy){

await interaction.deferReply()

const id = interaction.user.id

const player = economy.getUser(id)

// tạo mảng cá nếu chưa có
player.fish ??= []

// kiểm tra cần câu
if(!player.rod){

return interaction.editReply("🎣 Bạn chưa có cần câu")

}

// random cá
const fish = fishList[Math.floor(Math.random()*fishList.length)]

// thêm vào inventory
player.fish.push(fish.name)

// thêm exp
player.exp += 5

economy.updateUser(id,player)

return interaction.editReply(`🎣 Bạn câu được **${fish.name}**`)
}


// ===== BUY ROD =====

async function buyRod(interaction,economy){

await interaction.deferReply({ephemeral:true})

const rod = interaction.options.getString("rod")

const id = interaction.user.id

const player = economy.getUser(id)

const rods = {

basic:{
price:100
},

iron:{
price:500
},

gold:{
price:1500
}

}

if(!rods[rod]){

return interaction.editReply("❌ Loại cần câu không tồn tại")

}

if(player.vnd < rods[rod].price){

return interaction.editReply("❌ Không đủ tiền")

}

player.vnd -= rods[rod].price

player.rod = rod

economy.updateUser(id,player)

return interaction.editReply(`🎣 Đã mua cần câu **${rod}**`)

}

module.exports = {

run,
buyRod

}
