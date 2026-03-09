const fs = require("fs")

const path = "./src/data/taixiu.json"

function load(){

if(!fs.existsSync(path)){

return {
bets:{},
history:[],
enabled:true,
rig:null
}

}

return JSON.parse(fs.readFileSync(path))

}

function save(data){

fs.writeFileSync(path,JSON.stringify(data,null,2))

}

module.exports = { load, save }
