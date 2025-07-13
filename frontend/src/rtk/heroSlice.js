import { createSlice } from "@reduxjs/toolkit";
import { defaultHero } from "./constants";
import { StatCalculation } from "../utils/StatCalculation";

const initialState = {
  heroes: { 0: defaultHero },
  canvas: {},
  skills: {},
};
const heroSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    changeHero: (state, action) => {
      const { hero, id } = action.payload;
      if (hero != null) {
        state.heroes[id] = hero;
        state.heroes[id].calculatedStats = StatCalculation(hero);
        state.heroes[id].buffs = [0, 0, 0, 0];
        state.heroes[id].boon = null;
        state.heroes[id].bane = null;
        state.heroes[id].ascended = null;
        state.heroes[id].flowers = 0;
        state.heroes[id].merges = 0;
        state.heroes[id].resplendent = false;
        state.heroes[id].resplendentStats = false;
        state.heroes[id].blessing = null;
        state.heroes[id].blessingHeroList = [];
        state.heroes[id].summonerSupport = "No";
        state.heroes[id].allySupport = "No";
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
        levels[j] = tab.merges > 0 && tab.levels[j] === 0 ? 1 : tab.levels[j];
      }

      const visible = tab.aSkill?.visibleStats ?? [0, 0, 0, 0, 0];
      const visibleS =
        tab.sSkill?.visibleStats && tab.sSkill.visibleStats.length !== 1
          ? tab.sSkill.visibleStats
          : [0, 0, 0, 0, 0];
      const weaponStats = tab.weapon?.visibleStats ?? [0, 0, 0, 0, 0];
      const refineStats = tab.refine?.stats ?? [0, 0, 0, 0, 0];
      const buffStats = tab.buffStats ?? [0, 0, 0, 0];

      tab.hp =
        tab.hero.hp[3 + levels[0]] +
        tab.mergedStats[0] +
        tab.dragonflowerStats[0] +
        tab.blessingStats[0] +
        weaponStats[0] +
        refineStats[0] +
        visible[0] +
        visibleS[0] +
        tab.summonerSupportStats[0] +
        tab.resStats[0];
      tab.atk =
        tab.hero.atk[3 + levels[1]] +
        tab.mergedStats[1] +
        tab.dragonflowerStats[1] +
        tab.blessingStats[1] +
        tab.weapon.might +
        weaponStats[1] +
        refineStats[1] +
        visible[1] +
        visibleS[1] +
        tab.summonerSupportStats[1] +
        tab.transformed +
        tab.resStats[1] +
        tab.buffStats[0];
      tab.spd =
        tab.hero.spd[3 + levels[2]] +
        tab.mergedStats[2] +
        tab.dragonflowerStats[2] +
        tab.blessingStats[2] +
        weaponStats[2] +
        refineStats[2] +
        visible[2] +
        visibleS[2] +
        tab.summonerSupportStats[2] +
        tab.resStats[2] +
        tab.buffStats[1];
      tab.def =
        tab.hero.def[3 + levels[3]] +
        tab.mergedStats[3] +
        tab.dragonflowerStats[3] +
        tab.blessingStats[3] +
        weaponStats[3] +
        refineStats[3] +
        visible[3] +
        visibleS[3] +
        tab.summonerSupportStats[3] +
        tab.resStats[3] +
        tab.buffStats[2];
      tab.res =
        tab.hero.res[3 + levels[4]] +
        tab.mergedStats[4] +
        tab.dragonflowerStats[4] +
        tab.blessingStats[4] +
        weaponStats[4] +
        refineStats[4] +
        visible[4] +
        visibleS[4] +
        tab.summonerSupportStats[4] +
        tab.resStats[4] +
        tab.buffStats[3];
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
      const { merges, id } = action.payload;
      state.heroes[id].merges = merges;
    },

    changeTraits(state, action) {
      const { trait, value, id } = action.payload;
      switch (trait) {
        case "Asset":
          // ensure another trait isnt already listed.
          state.heroes[id].boon = value;
          break;
        case "Flaw":
          state.heroes[id].bane = value;
          break;
        case "Ascended":
          state.heroes[id].ascended = value;
          break;
        default:
          console.log("error");
      }
      state.heroes[id].calculatedStats = StatCalculation(state.heroes[id]);
    },

    changeDragonflowers(state, action) {
      const { dragonflowers, id } = action.payload;
      state.heroes[id].flowers = dragonflowers;
      state.heroes[id].calculatedStats = StatCalculation(state.heroes[id]);
    },

    changeResplendent(state, action) {
      const { r, id } = action.payload;
      state.heroes[id].resplendent = r;
    },

    changeResplendentStats(state, action) {
      const { r, id } = action.payload;
      state.heroes[id].resplendentStats = r;

      // let tempArray = [0, 0, 0, 0, 0];
      // if (res) {
      //   tempArray = [2, 2, 2, 2, 2];
      // }
      // const tab = state.tabList[id];
      // tab.resplendentStats = res;
      // tab.resStats = tempArray;
    },

    changeTransformed(state, action) {
      const { transformed, id } = action.payload;
      const tab = state.tabList[id];
      if (transformed && tab.hero.weapon_type.includes("Beast")) {
        tab.transformed = 2;
      } else {
        tab.transformed = 0;
      }
    },

    changeBlessing(state, action) {
      const { blessing, id } = action.payload;
      state.heroes[id].blessing = blessing;
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
      if (summoner_support === "C") summonerSupportStats = [3, 0, 0, 0, 2];
      else if (summoner_support === "B") summonerSupportStats = [4, 0, 0, 2, 2];
      else if (summoner_support === "A") summonerSupportStats = [4, 0, 2, 2, 2];
      else if (summoner_support === "S") summonerSupportStats = [5, 2, 2, 2, 2];

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
  changeTraits,
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
