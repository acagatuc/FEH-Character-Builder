

const statCalcuation = (merges) => {
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
        var prevAsset = state.tabList[id].levels.indexOf(2);
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

      state.tabList[id].mergedStats = tempArray;
      
}