const fs = require("fs")

const path = "./src/data/players.json"

// ================= LOAD =================

function load(){

if(!fs.existsSync(path)){

fs.writeFileSync(path,JSON.stringify({users:{}},null,2))

}

return JSON.parse(fs.readFileSync(path))

}

// ================= SAVE =================

function save(data){

fs.writeFileSync(path,JSON.stringify(data,null,2))

}

// ================= PLAYER SCHEMA =================

function createPlayer(){

return {

vnd:0,
gold:0,

class:null,
level:1,
exp:0,

hp:100,
maxhp:100,

dmg:5,
def:5,
crit:5,
spell:0,

weapon:null,
weaponDmg:0,

rods:0,

inventory:[]

}

}

// ================= GET USER =================

function getUser(id){

const data = load()

if(!data.users[id]){

data.users[id] = createPlayer()

save(data)

}

return data.users[id]

}

// ================= UPDATE USER =================

function updateUser(id,user){

const data = load()

data.users[id] = user

save(data)

}

module.exports = {

getUser,
updateUser

}
