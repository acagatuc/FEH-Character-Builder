const StatCalculation = (hero) => {
  //currently take index 1 (neutral) for all stats. expand this later with boons and banes
  var base = getBaseStats(
    hero.baseStats40,
    hero.boon,
    hero.bane,
    hero.ascended
  );
  if (hero.merges > 0) {
    calculateMerges(base, hero.merges, getOrder(base));
  }
  if (hero.dragonflowers > 0) {
    calculateDragonflowers(stats, hero.dragonflowers)
  }
  if (hero.hasResplendent) {
    calculateResplendent(stats, hero.resplendentStats)
  }
  if (hero.blessingHeroList != []) {
    calculateLMBuffs(stats, hero.blessingHeroList)
  }
  // still needs stats from weapon/skills, fort level, summoner support, transformation (beast only)
  return base;
};

const getBaseStats = (baseStats, boon, bane, ascended) => {
  var tempArray = [];
  Object.entries(baseStats).forEach(([key, value]) => {
    if (key === boon) {
      tempArray.push(value[2]);
    } else if (key === ascended) {
      tempArray.push(value[2]);
    } else if (key === bane) {
      tempArray.push(value[0]);
    } else {
      tempArray.push(value[1]);
    }
  });
  return tempArray;
};

const getOrder = (baseStats) => {
  // Step 1: Map each value to its index
  const order = arr.map((value, index) => ({ value, index }));

  // Step 2: Sort by value
  order.sort((a, b) => a.value - b.value);

  // Step 3: Return array of original indexes in sorted order
  return order.map((item) => item.index);
};

const calculateMerges = (stats, merges, order) => {
  var tempArray = [0, 0, 0, 0, 0];
  if (merges === 10) {
    tempArray[order[4]] = tempArray[order[4]] + 1;
    tempArray[order[3]] = tempArray[order[3]] + 1;
  }
  if (merges >= 9) {
    tempArray[order[1]] = tempArray[order[1]] + 1;
    tempArray[order[2]] = tempArray[order[2]] + 1;
  }
  if (merges >= 8) {
    tempArray[order[4]] = tempArray[order[4]] + 1;
    tempArray[order[0]] = tempArray[order[0]] + 1;
  }
  if (merges >= 7) {
    tempArray[order[2]] = tempArray[order[2]] + 1;
    tempArray[order[3]] = tempArray[order[3]] + 1;
  }
  if (merges >= 6) {
    tempArray[order[1]] = tempArray[order[1]] + 1;
    tempArray[order[0]] = tempArray[order[0]] + 1;
  }
  if (merges >= 5) {
    tempArray[order[4]] = tempArray[order[4]] + 1;
    tempArray[order[3]] = tempArray[order[3]] + 1;
  }
  if (merges >= 4) {
    tempArray[order[1]] = tempArray[order[1]] + 1;
    tempArray[order[2]] = tempArray[order[2]] + 1;
  }
  if (merges >= 3) {
    tempArray[order[4]] = tempArray[order[4]] + 1;
    tempArray[order[0]] = tempArray[order[0]] + 1;
  }
  if (merges >= 2) {
    tempArray[order[2]] = tempArray[order[2]] + 1;
    tempArray[order[3]] = tempArray[order[3]] + 1;
  }
  if (merges >= 1) {
    var prevAsset = state.heroes.hero[id].levels.indexOf(2);
    var prevFlaw = state.tabList[id].levels.indexOf(0);
    if (prevFlaw === -1 && prevAsset === -1) {
      tempArray[order[0]] = tempArray[order[0]] + 2;
      tempArray[order[1]] = tempArray[order[1]] + 2;
      tempArray[order[2]] = tempArray[order[2]] + 1;
    } else {
      tempArray[order[0]] = tempArray[order[0]] + 1;
      tempArray[order[1]] = tempArray[order[1]] + 1;
    }
  }
  return tempArray;
};

const calculateDragonflowers = (stats, dragonflowers) => {
  for (let i = 0; i < dragonflowers; i++) {
    stats[i % 5] += 1;
  }
  return stats;
};

const calculateResplendent = (stats, resplendent) => {
  return resplendent ? stats.map((element) => element + 2) : stats;
};

const calculateBuffs = (stats, buffs) => {
  buffs.forEach((buff, index) => {
    stats[index] = stats[index] + buff;
  });
  return stats;
};

const calculateLMBuffs = (stats, lmHeroes) => {
  lmHeroes.forEach((element) => {
    element.boost.forEach((stat, index) => {
      stats[index] = stats[index] + stat;
    });
  });
  return stats;
};

export { StatCalculation };
