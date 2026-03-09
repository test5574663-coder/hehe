// rpg/rpgCore.js

/* =========================
   CLASS BASE STATS
========================= */

const baseStats = {
  warrior: { hp: 150, atk: 20, def: 12, crit: 5 },
  assassin: { hp: 100, atk: 28, def: 6, crit: 20 },
  mage: { hp: 90, atk: 35, def: 4, crit: 15 }
};

function getStats(className) {
  return baseStats[className] || baseStats.warrior;
}


/* =========================
   LEVEL SYSTEM
========================= */

function expToNext(level) {
  return level * 100;
}

function addExp(player, expGain) {

  player.exp += expGain;
  let leveled = false;

  while (player.exp >= expToNext(player.level)) {
    player.exp -= expToNext(player.level);
    player.level++;
    leveled = true;
  }

  return leveled;
}

function expBar(exp, level) {

  const max = expToNext(level);
  const ratio = exp / max;

  const size = 10;
  const filled = Math.round(size * ratio);

  return "█".repeat(filled) + "░".repeat(size - filled);
}


/* =========================
   DAMAGE SYSTEM
========================= */

function calculateDamage(attacker, target) {

  let damage = attacker.atk - target.def;

  if (damage < 1) damage = 1;

  const critChance = attacker.crit || 0;

  if (Math.random() < critChance / 100) {
    damage *= 2;
  }

  return Math.floor(damage);
}


/* =========================
   HP BAR
========================= */

function hpBar(current, max) {

  const size = 10;
  const ratio = current / max;

  const filled = Math.round(size * ratio);

  return "█".repeat(filled) + "░".repeat(size - filled);
}


/* =========================
   PARTY SYSTEM
========================= */

function createParty(players) {
  return {
    members: players,
    createdAt: Date.now()
  };
}

function randomMember(party) {

  const index = Math.floor(Math.random() * party.members.length);
  return party.members[index];

}


/* =========================
   LOOT SYSTEM
========================= */

function rollLoot(table) {

  const roll = Math.random();
  let cumulative = 0;

  for (const item of table) {

    cumulative += item.rate;

    if (roll <= cumulative) {
      return item;
    }

  }

  return null;
}


/* =========================
   EXP REWARD
========================= */

function bossExp(level) {
  return 50 + level * 20;
}

function dungeonExp(level) {
  return 30 + level * 10;
}


/* =========================
   EXPORT
========================= */

module.exports = {

  baseStats,
  getStats,

  expToNext,
  addExp,
  expBar,

  calculateDamage,

  hpBar,

  createParty,
  randomMember,

  rollLoot,

  bossExp,
  dungeonExp

};