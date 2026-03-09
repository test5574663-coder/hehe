require("dotenv").config()

const { REST, Routes, SlashCommandBuilder } = require("discord.js")

const CLIENT_ID = "123456789012345678"

const commands = [

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
.setDescription("Bật / tắt tài xỉu"),

new SlashCommandBuilder()
.setName("profile")
.setDescription("Xem profile"),

new SlashCommandBuilder()
.setName("boss")
.setDescription("Đánh boss"),

new SlashCommandBuilder()
.setName("dungeon")
.setDescription("Vào dungeon")

].map(cmd => cmd.toJSON())

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN)

rest.put(
Routes.applicationCommands(CLIENT_ID),
{ body: commands }
)
.then(()=>console.log("Slash commands deployed"))
.catch(console.error)
