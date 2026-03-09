function betrayal(players){

const chance = Math.random()

if(chance < 0.15){

const index = Math.floor(Math.random()*players.length)

return players[index]

}

return null

}

module.exports = {

betrayal

}
