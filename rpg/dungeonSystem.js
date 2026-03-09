const weapons = require("./classWeapons")
const { betrayal } = require("./betrayalSystem")

function randomFrom(list){

return list[Math.floor(Math.random()*list.length)]

}

function randomWeapon(){

const roll = Math.random()

if(roll < 0.60) return randomFrom(weapons.common)

if(roll < 0.85) return randomFrom(weapons.rare)

if(roll < 0.97) return randomFrom(weapons.epic)

return randomFrom(weapons.legendary)

}

// ================= RUN DUNGEON =================

function runDungeon(players){

const rooms = Math.floor(Math.random()*4)+3

let gold = 0
let exp = 0
let weapon = null

for(let i=0;i<rooms;i++){

const roll = Math.random()

if(roll < 0.5){

exp += 20

}

else if(roll < 0.8){

gold += 10

}

else{

weapon = randomWeapon()

}

}

const traitor = betrayal(players)

return {

rooms,
exp,
gold,
weapon,
traitor

}

}

module.exports = {

runDungeon

}
