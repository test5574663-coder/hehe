const { EmbedBuilder } = require("discord.js")

function diceEmoji(n){
return ["","⚀","⚁","⚂","⚃","⚄","⚅"][n]
}

function historyLine(history){
return history.map(x => x === "tai" ? "⚪" : "⚫").join("")
}

function boardEmbed(data,cooldown,result,dice){

const taiMoney = Object.values(data.bets || {})
.filter(b=>b.side==="tai")
.reduce((a,b)=>a+b.money,0)

const xiuMoney = Object.values(data.bets || {})
.filter(b=>b.side==="xiu")
.reduce((a,b)=>a+b.money,0)

const history = historyLine(data.history || [])

const diceLine = dice ? `${diceEmoji(dice[0])} ${diceEmoji(dice[1])} ${diceEmoji(dice[2])}` : "🎲 🎲 🎲"

return new EmbedBuilder()

.setColor(0x2f3136)

.setDescription(`

=========== **/Taixiu For Fun/** ===========

⚪ **Tài** ⚪        ⏳ ${cooldown}s        ⚫ **Xỉu** ⚫

💰 ${taiMoney} VND        ${result || "Rolling..."}        💰 ${xiuMoney} VND

${diceLine}

--------------------------------------

${history || "Chưa có lịch sử"}

=================================

`)

}

module.exports = { boardEmbed }
