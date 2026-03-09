const { EmbedBuilder } = require("discord.js")

function expBar(exp){

const max = 100

const filled = Math.floor((exp/max)*10)

const empty = 10-filled

return "█".repeat(filled) + "░".repeat(empty)

}

function profileEmbed(user,player){

const embed = new EmbedBuilder()

.setTitle(`👤 ${user.username}`)

.setDescription(
`
Class: ${player.class || "Chưa chọn"}

Level: ${player.level}
EXP: ${expBar(player.exp)}

HP: ${player.hp}/${player.maxhp}

DMG: ${player.dmg}
DEF: ${player.def}
CRIT: ${player.crit}
SPELL: ${player.spell}

💰 VND: ${player.vnd}
💰 GOLD: ${player.gold}
`
)

.setColor("#9b59b6")

return embed

}

module.exports = {

profileEmbed

}
