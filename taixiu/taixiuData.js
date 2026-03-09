const fs = require("fs")

const path = "./src/data/taixiu.json"

// ===== LOAD =====

function load(){

if(!fs.existsSync(path)){

const data = {
bets:{},
history:[],
enabled:true,
rig:null
}

fs.writeFileSync(path,JSON.stringify(data,null,2))

return data

}

const data = JSON.parse(fs.readFileSync(path))

data.bets ??= {}
data.history ??= []
data.enabled ??= true
data.rig ??= null

return data

}

// ===== SAVE =====

function save(data){

fs.writeFileSync(path,JSON.stringify(data,null,2))

}

module.exports = { load, save }
