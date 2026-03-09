const { EmbedBuilder } = require("discord.js")

function fishResult(fish){

const embed = new EmbedBuilder()

.setTitle("🎣 Bạn đã câu được")

.setDescription(
`
🐟 ${fish.name}

⭐ Rarity: ${fish.rarity}
💰 Giá trị: ${fish.value}
`
)

.setColor("#3498db")

return embed

}

function sellResult(vnd,gold){

const embed = new EmbedBuilder()

.setTitle("💰 Bán cá")

.setDescription(
`VND: ${vnd}
GOLD: ${gold}`
)

.setColor("#2ecc71")

return embed

}

function shopEmbed(){

const embed = new EmbedBuilder()

.setTitle("🎣 Shop cần câu")

.setDescription(
`
1️⃣ Cần câu thường — 50 VND
2️⃣ Cần câu xịn — 150 VND
3️⃣ Cần câu thần — 400 VND

1 cần = 1 lần câu
Tối đa 99
`
)

.setColor("#f1c40f")

return embed

}

module.exports = {

fishResult,
sellResult,
shopEmbed

}
