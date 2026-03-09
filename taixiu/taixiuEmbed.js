const { EmbedBuilder } = require("discord.js")

// ================= HISTORY =================

function historyLine(history){

return history.map(h => h === "tai" ? "🔵" : "🟢").join("")

}

// ================= TABLE =================

function tableEmbed(data,time){

const tai = Object.values(data.bets)
.filter(b=>b.side==="tai")
.reduce((a,b)=>a+b.money,0)

const xiu = Object.values(data.bets)
.filter(b=>b.side==="xiu")
.reduce((a,b)=>a+b.money,0)

const history = historyLine(data.history)

const embed = new EmbedBuilder()

.setTitle("======= 🎲 Taixiu For Fun 🎲 =======")

.setDescription(
`
💰 **Tài**        ⏳ **${time}s**        **Xỉu**

${tai}                        ${xiu}

```
        🎲 🎲 🎲
```

────────────────────────
${history || "Chưa có cầu"}
────────────────────────
`
)

.setColor("#f39c12")

return embed

}

// ================= RESULT =================

function resultEmbed(result,dice){

const sum = dice.reduce((a,b)=>a+b)

const embed = new EmbedBuilder()

.setTitle("🎲 Kết quả")

.setDescription(
`
🎲 ${dice[0]}  🎲 ${dice[1]}  🎲 ${dice[2]}

📊 Tổng: **${sum}**

🔥 Kết quả: **${result.toUpperCase()}**
`
)

.setColor("#2ecc71")

return embed

}

module.exports = {

tableEmbed,
resultEmbed

}
