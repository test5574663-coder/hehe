require("dotenv").config()

const { REST, Routes, SlashCommandBuilder } = require("discord.js")
const CLIENT_ID = "1479461907235864576"
// ===== COMMAND LIST =====

const commands = [

/* ================= FISHING ================= */

new SlashCommandBuilder()
.setName("fish")
.setDescription("Câu cá"),

new SlashCommandBuilder()
.setName("buyrod")
.setDescription("Mua cần câu")
.addStringOption(option =>
option.setName("rod")
.setDescription("Loại cần câu")
.setRequired(true)
),

/* ================= TAIXIU ================= */

new SlashCommandBuilder()
.setName("taixiu")
.setDescription("Chơi tài xỉu")
.addStringOption(option =>
option.setName("side")
.setDescription("tai hoặc xiu")
.setRequired(true)
)
.addIntegerOption(option =>
option.setName("money")
.setDescription("Số tiền cược")
.setRequired(true)
),

/* ================= DEV ================= */

new SlashCommandBuilder()
.setName("rig")
.setDescription("Bẻ cầu tài xỉu (dev)")
.addStringOption(option =>
option.setName("side")
.setDescription("tai hoặc xiu")
.setRequired(true)
),

new SlashCommandBuilder()
.setName("taixiu-toggle")
.setDescription("Bật hoặc tắt game tài xỉu (dev)"),

/* ================= RPG ================= */

new SlashCommandBuilder()
.setName("profile")
.setDescription("Xem profile nhân vật"),

new SlashCommandBuilder()
.setName("boss")
.setDescription("Đánh boss"),

new SlashCommandBuilder()
.setName("dungeon")
.setDescription("Vào dungeon")

].map(cmd => cmd.toJSON())

// ===== REGISTER COMMAND =====

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN)

;(async () => {

try {

console.log("Deploying slash commands...")

await rest.put(
Routes.applicationCommands(process.env.CLIENT_ID),
{ body: commands }
)

console.log("Slash commands deployed successfully")

} catch (error) {

console.error(error)

}

})()
