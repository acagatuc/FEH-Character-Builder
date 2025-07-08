const StatCalculation = (hero) => {
  //currently take index 1 (neutral) for all stats. expand this later with boons and banes
  var base = getBaseStats(hero.baseStats40, hero.boon, hero.bane, hero.ascended)
  // calculateMerges(hero.merges, order)
  // calculateDragonflowers(hero.merges)
  // calculateResplendent(hero.merges)

  return base
  // var tempArray = [0, 0, 0, 0, 0];
}

const getBaseStats = (baseStats, boon, bane, ascended) => {
  var tempArray = []
  Object.entries(baseStats).forEach(([key, value]) => {
    if (key === boon) {
      tempArray.push(value[2]);
    }
    else if (key === ascended) {
      tempArray.push(value[2]);
    }
    else if (key === bane) {
      tempArray.push(value[0]);
    }
    else {
      tempArray.push(value[1]);
    }
  });
  return tempArray;
}

const calculateMerges = (merges) => {
  var tempArray = [0, 0, 0, 0, 0];
  // if (merges === 10) {
  //   tempArray[order[4]] = tempArray[order[4]] + 1;
  //   tempArray[order[3]] = tempArray[order[3]] + 1;
  // }
  // if (merges >= 9) {
  //   tempArray[order[1]] = tempArray[order[1]] + 1;
  //   tempArray[order[2]] = tempArray[order[2]] + 1;
  // }
  // if (merges >= 8) {
  //   tempArray[order[4]] = tempArray[order[4]] + 1;
  //   tempArray[order[0]] = tempArray[order[0]] + 1;
  // }
  // if (merges >= 7) {
  //   tempArray[order[2]] = tempArray[order[2]] + 1;
  //   tempArray[order[3]] = tempArray[order[3]] + 1;
  // }
  // if (merges >= 6) {
  //   tempArray[order[1]] = tempArray[order[1]] + 1;
  //   tempArray[order[0]] = tempArray[order[0]] + 1;
  // }
  // if (merges >= 5) {
  //   tempArray[order[4]] = tempArray[order[4]] + 1;
  //   tempArray[order[3]] = tempArray[order[3]] + 1;
  // }
  // if (merges >= 4) {
  //   tempArray[order[1]] = tempArray[order[1]] + 1;
  //   tempArray[order[2]] = tempArray[order[2]] + 1;
  // }
  // if (merges >= 3) {
  //   tempArray[order[4]] = tempArray[order[4]] + 1;
  //   tempArray[order[0]] = tempArray[order[0]] + 1;
  // }
  // if (merges >= 2) {
  //   tempArray[order[2]] = tempArray[order[2]] + 1;
  //   tempArray[order[3]] = tempArray[order[3]] + 1;
  // }
  // if (merges >= 1) {
  //   var prevAsset = state.heroes.hero[id].levels.indexOf(2);
  //   var prevFlaw = state.tabList[id].levels.indexOf(0);
  //   if (prevFlaw === -1 && prevAsset === -1) {
  //     tempArray[order[0]] = tempArray[order[0]] + 2;
  //     tempArray[order[1]] = tempArray[order[1]] + 2;
  //     tempArray[order[2]] = tempArray[order[2]] + 1;
  //   } else {
  //     tempArray[order[0]] = tempArray[order[0]] + 1;
  //     tempArray[order[1]] = tempArray[order[1]] + 1;
  //   }
  // }
  return tempArray;
}

const calculateDragonflowers = (dragonflowers) => {
  var tempArray = [0, 0, 0, 0, 0];
  for (let i = 0; i < dragonflowers; i++) {
    tempArray[i % 5] += 1;
  }
  return tempArray;
}

const calculateResplendent = (resplendent) => {
  return (resplendent ? [2, 2, 2, 2, 2] : [0, 0, 0, 0, 0])
}

export { StatCalculation };