import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heroes: {},
  canvas: {},
  skills: {}
};
const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    changeHero: (state, action) => {
      const { hero, id } = action.payload;
      if (hero != null) {
        state.heroes[id] = hero;
      } else {
        state.heroes[id] = {};
      }
    },

    copyHero: (state, action) => {
      const { id, length } = action.payload;
      const originalHero = state.heroes[id];

      state.heroes[length] = {
        ...originalHero,
        id: length,
        // optionally reset or tweak values here
      };

      console.log(JSON.parse(JSON.stringify(state)));
    },

    loadBuildFromBarracks(state, action) {
      const { build, id } = action.payload;
      state.key++;
      const barracksHero = { ...build, key: state.key, id };
      state.tabList[id] = barracksHero;
    },

    changeStats(state, action) {
      const { id } = action.payload;

      const tab = state.tabList[id];

      let levels = [0, 0, 0, 0, 0];
      for (let j = 0; j < levels.length; j++) {
        levels[j] = (tab.merges > 0 && tab.levels[j] === 0) ? 1 : tab.levels[j];
      }

      const visible = tab.aSkill?.visibleStats ?? [0, 0, 0, 0, 0];
      const visibleS = (tab.sSkill?.visibleStats && tab.sSkill.visibleStats.length !== 1) ? tab.sSkill.visibleStats : [0, 0, 0, 0, 0];
      const weaponStats = tab.weapon?.visibleStats ?? [0, 0, 0, 0, 0];
      const refineStats = tab.refine?.stats ?? [0, 0, 0, 0, 0];
      const buffStats = tab.buffStats ?? [0, 0, 0, 0];

      tab.hp = tab.hero.hp[3 + levels[0]] + tab.mergedStats[0] + tab.dragonflowerStats[0] + tab.blessingStats[0] + weaponStats[0] + refineStats[0] + visible[0] + visibleS[0] + tab.summonerSupportStats[0] + tab.resStats[0];
      tab.atk = tab.hero.atk[3 + levels[1]] + tab.mergedStats[1] + tab.dragonflowerStats[1] + tab.blessingStats[1] + tab.weapon.might + weaponStats[1] + refineStats[1] + visible[1] + visibleS[1] + tab.summonerSupportStats[1] + tab.transformed + tab.resStats[1] + tab.buffStats[0];
      tab.spd = tab.hero.spd[3 + levels[2]] + tab.mergedStats[2] + tab.dragonflowerStats[2] + tab.blessingStats[2] + weaponStats[2] + refineStats[2] + visible[2] + visibleS[2] + tab.summonerSupportStats[2] + tab.resStats[2] + tab.buffStats[1];
      tab.def = tab.hero.def[3 + levels[3]] + tab.mergedStats[3] + tab.dragonflowerStats[3] + tab.blessingStats[3] + weaponStats[3] + refineStats[3] + visible[3] + visibleS[3] + tab.summonerSupportStats[3] + tab.resStats[3] + tab.buffStats[2];
      tab.res = tab.hero.res[3 + levels[4]] + tab.mergedStats[4] + tab.dragonflowerStats[4] + tab.blessingStats[4] + weaponStats[4] + refineStats[4] + visible[4] + visibleS[4] + tab.summonerSupportStats[4] + tab.resStats[4] + tab.buffStats[3];
    },

    changeWeapon(state, action) {
      const { weapon, id } = action.payload;
      state.tabList[id].weapon = weapon;
    },

    changeRefine(state, action) {
      const { refine, id } = action.payload;
      state.tabList[id].refine = refine;
    },

    changeAssist(state, action) {
      const { assist, id } = action.payload;
      state.tabList[id].assist = assist;
    },

    changeSpecial(state, action) {
      const { special, id } = action.payload;
      state.tabList[id].special = special;
    },

    changeASlot(state, action) {
      const { a, id } = action.payload;
      state.tabList[id].aSkill = a;
    },

    changeBSlot(state, action) {
      const { b, id } = action.payload;
      state.tabList[id].bSkill = b;
    },

    changeCSlot(state, action) {
      const { c, id } = action.payload;
      state.tabList[id].cSkill = c;
    },

    changeSSlot(state, action) {
      const { s, id } = action.payload;
      state.tabList[id].sSkill = s;
    },

    changeMerges(state, action) {
      const { merges, order, id } = action.payload;
      const tab = state.tabList[id];
      tab.merges = merges;
      tab.mergeOrder = order;

      let tempArray = [0, 0, 0, 0, 0];

      if (merges === 10) {
        tempArray[order[4]] += 1;
        tempArray[order[3]] += 1;
      }
      if (merges >= 9) {
        tempArray[order[1]] += 1;
        tempArray[order[2]] += 1;
      }
      if (merges >= 8) {
        tempArray[order[4]] += 1;
        tempArray[order[0]] += 1;
      }
      if (merges >= 7) {
        tempArray[order[2]] += 1;
        tempArray[order[3]] += 1;
      }
      if (merges >= 6) {
        tempArray[order[1]] += 1;
        tempArray[order[0]] += 1;
      }
      if (merges >= 5) {
        tempArray[order[4]] += 1;
        tempArray[order[3]] += 1;
      }
      if (merges >= 4) {
        tempArray[order[1]] += 1;
        tempArray[order[2]] += 1;
      }
      if (merges >= 3) {
        tempArray[order[4]] += 1;
        tempArray[order[0]] += 1;
      }
      if (merges >= 2) {
        tempArray[order[2]] += 1;
        tempArray[order[3]] += 1;
      }
      if (merges >= 1) {
        const prevAsset = tab.levels.indexOf(2);
        const prevFlaw = tab.levels.indexOf(0);
        if (prevFlaw === -1 && prevAsset === -1) {
          tempArray[order[0]] += 2;
          tempArray[order[1]] += 2;
          tempArray[order[2]] += 1;
        } else {
          tempArray[order[0]] += 1;
          tempArray[order[1]] += 1;
        }
      }

      tab.mergedStats = tempArray;
    },

    changeLevels(state, action) {
      const { levels, id, asset, flaw, ascended } = action.payload;
      const tab = state.tabList[id];
      tab.levels = levels;
      tab.asset = asset;
      tab.flaw = flaw;
      tab.ascended = ascended;
    },

    changeDragonflowers(state, action) {
      const { dragonflowers, id } = action.payload;
      const tab = state.tabList[id];
      tab.dragonflowers = dragonflowers;

      let tempArray = [0, 0, 0, 0, 0];
      if (dragonflowers !== null) {
        let index = 0;
        while (index < dragonflowers) {
          tempArray[index % 5] += 1;
          index++;
        }
        tab.dragonflowerStats = tempArray;
      } else {
        tab.dragonflowerStats = [0, 0, 0, 0, 0];
      }
    },

    changeResplendent(state, action) {
      const { res, id } = action.payload;
      state.tabList[id].resplendent = res;
    },

    changeResplendentStats(state, action) {
      const { res, id } = action.payload;
      let tempArray = [0, 0, 0, 0, 0];
      if (res) {
        tempArray = [2, 2, 2, 2, 2];
      }
      const tab = state.tabList[id];
      tab.resplendentStats = res;
      tab.resStats = tempArray;
    },

    changeTransformed(state, action) {
      const { transformed, id } = action.payload;
      const tab = state.tabList[id];
      if (transformed && tab.hero.weapon_type.includes('Beast')) {
        tab.transformed = 2;
      } else {
        tab.transformed = 0;
      }
    },

    changeBlessing(state, action) {
      const { blessing, id } = action.payload;
      state.tabList[id].blessing = blessing;
    },

    changeBlessingStats(state, action) {
      const { stats, heroes, id } = action.payload;
      const tab = state.tabList[id];
      tab.blessingStats = stats;
      tab.blessingHeroList = heroes;
    },

    changeSummonerSupport(state, action) {
      const { summoner_support, id } = action.payload;
      const tab = state.tabList[id];
      tab.summonerSupport = summoner_support;

      let summonerSupportStats = [0, 0, 0, 0, 0];
      if (summoner_support === 'C') summonerSupportStats = [3, 0, 0, 0, 2];
      else if (summoner_support === 'B') summonerSupportStats = [4, 0, 0, 2, 2];
      else if (summoner_support === 'A') summonerSupportStats = [4, 0, 2, 2, 2];
      else if (summoner_support === 'S') summonerSupportStats = [5, 2, 2, 2, 2];

      tab.summonerSupportStats = summonerSupportStats;
    },

    changeAllySupport(state, action) {
      const { ally_support, id } = action.payload;
      state.tabList[id].allySupport = ally_support;
    },

    changeBuffedStats(state, action) {
      const { index, number, id } = action.payload;
      state.tabList[id].buffStats[index] = number;
    },

    changeBackground(state, action) {
      const { bg, id } = action.payload;
      state.tabList[id].background = bg;
    },

    changeFavorite(state, action) {
      const { fav, id } = action.payload;
      state.tabList[id].favorite = fav;
    },
  },
});

export const {
  changeHero,
  copyHero,
  loadBuildFromBarracks,
  changeStats,
  changeWeapon,
  changeRefine,
  changeAssist,
  changeSpecial,
  changeASlot,
  changeBSlot,
  changeCSlot,
  changeSSlot,
  changeMerges,
  changeLevels,
  changeDragonflowers,
  changeResplendent,
  changeResplendentStats,
  changeTransformed,
  changeBlessing,
  changeBlessingStats,
  changeSummonerSupport,
  changeAllySupport,
  changeBuffedStats,
  changeBackground,
  changeFavorite,
} = heroSlice.actions;

export default heroSlice.reducer;
