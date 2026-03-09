const classes = require("./classes")
const embed = require("./rpgEmbed")

// ================= CLASS =================

async function chooseClass(interaction,economy){

const cls = interaction.options.getString("class")

if(!classes[cls]){

return interaction.reply("Class không tồn tại")

}

const player = economy.getUser(interaction.user.id)

player.class = cls

player.maxhp = classes[cls].hp
player.hp = classes[cls].hp

player.dmg = classes[cls].dmg
player.def = classes[cls].def
player.crit = classes[cls].crit
player.spell = classes[cls].spell

economy.updateUser(interaction.user.id,player)

return interaction.reply(`Bạn đã chọn **${classes[cls].name}**`)

}

// ================= PROFILE =================

async function profile(interaction,economy){

const player = economy.getUser(interaction.user.id)

return interaction.reply({

embeds:[embed.profileEmbed(interaction.user,player)]

})

}

// ================= INVENTORY =================

async function inventory(interaction,economy){

const player = economy.getUser(interaction.user.id)

if(!player.inventory.length){

return interaction.reply("Inventory trống")

}

return interaction.reply(player.inventory.join("\n"))

}

module.exports = {

chooseClass,
profile,
inventory

}
