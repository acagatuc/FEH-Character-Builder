import {
  ADD_TAB,
  COPY_TAB,
  DELETE_TAB,
  CHANGE_TAB,
  RESET_TAB,
  CHANGE_HERO,
  LOAD_BUILD_FROM_BARRACKS,
  CHANGE_STATS,
  CHANGE_WEAPON,
  CHANGE_REFINE,
  CHANGE_ASSIST,
  CHANGE_SPECIAL,
  CHANGE_ASLOT,
  CHANGE_BSLOT,
  CHANGE_CSLOT,
  CHANGE_SSLOT,
  CHANGE_MERGES,
  CHANGE_LEVELS,
  CHANGE_DRAGONFLOWERS,
  CHANGE_RESPLENDENT,
  CHANGE_RESPLENDENT_STATS,
  CHANGE_TRANSFORMED,
  CHANGE_BLESSING,
  CHANGE_BLESSING_STATS,
  CHANGE_SUMMONER_SUPPORT,
  CHANGE_ALLY_SUPPORT,
  CHANGE_BUFFED_STATS,
  CHANGE_BACKGROUND,
  CHANGE_FAVORITE,
} from "../actionTypes";

// import { clone, cloneDeep } from "lodash";

const initState = {
  key: 0,
  tabValue: 0,
  tabList: [
    {
      key: 0,
      id: 0,
      value: null,
      label: "",
      hero: {
        name: "",
        singleName: "",
        title: "",
        VA: "",
        artist: "",
        hp: [],
        atk: [],
        spd: [],
        def: [],
        res: [],
        superboon: [],
        superbane: [],
        weapons: [],
        assists: [],
        specials: [],
        passives: [],
        weapon_type: "",
        move_type: "",
        hero_type: "",
        dragonflowers: 0,
        exists: false,
      },
      hp: "",
      atk: "",
      spd: "",
      def: "",
      res: "",
      levels: [1, 1, 1, 1, 1],
      asset: "",
      flaw: "",
      ascended: "",
      merges: 0,
      mergeOrder: [],
      mergedStats: [0, 0, 0, 0, 0],
      buffStats: [0, 0, 0, 0],
      dragonflowers: 0,
      dragonflowerStats: [0, 0, 0, 0, 0],
      resplendent: false,
      resplendentStats: false,
      resStats: [0, 0, 0, 0, 0],
      transformed: 0,
      blessing: "",
      blessingStats: [0, 0, 0, 0, 0],
      blessingHeroList: [],
      summonerSupport: "",
      summonerSupportStats: [0, 0, 0, 0, 0],
      allySupport: "",
      background: "",
      favorite: "",
      weapon: {
        name: "",
        might: 0,
        visibleStats: [0, 0, 0, 0, 0],
        refine: false,
        rearmed: false,
      },
      refine: {
        name: "",
        img: "",
        stats: [0, 0, 0, 0, 0],
      },
      assist: {
        name: "",
        unique: false,
      },
      special: {
        name: "",
        unique: false,
      },
      aSkill: {
        name: "",
        visibleStats: [0, 0, 0, 0, 0],
        unique: false,
      },
      bSkill: {
        name: "",
        unique: false,
      },
      cSkill: {
        name: "",
        unique: false,
      },
      sSkill: {
        name: "",
        visibleStats: [0, 0, 0, 0, 0],
      },
    },
  ],
};

export default function (state = initState, action) {
  switch (action.type) {
    // tabs actions
    case ADD_TAB: {
      const { id } = action.payload;
      state.key++;

      state.tabList = [
        ...state.tabList,
        {
          key: state.key,
          id: id,
          value: null,
          label: "",
          hero: {
            name: "",
            singleName: "",
            title: "",
            VA: "",
            artist: "",
            hp: [],
            atk: [],
            spd: [],
            def: [],
            res: [],
            superboon: [],
            superbane: [],
            weapons: [],
            assists: [],
            specials: [],
            passives: [],
            weapon_type: "",
            move_type: "",
            hero_type: "",
            dragonflowers: 0,
            exists: false,
          },
          hp: "",
          atk: "",
          spd: "",
          def: "",
          res: "",
          levels: [1, 1, 1, 1, 1],
          asset: "",
          flaw: "",
          ascended: "",
          merges: 0,
          mergeOrder: [],
          mergedStats: [0, 0, 0, 0, 0],
          buffStats: [0, 0, 0, 0],
          dragonflowers: 0,
          dragonflowerStats: [0, 0, 0, 0, 0],
          resplendent: false,
          resplendentStats: false,
          resStats: [0, 0, 0, 0, 0],
          transformed: 0,
          blessing: "",
          blessingStats: [0, 0, 0, 0, 0],
          blessingHeroList: [],
          summonerSupport: "",
          summonerSupportStats: [0, 0, 0, 0, 0],
          allySupport: "",
          background: "",
          favorite: "",
          weapon: {
            name: "",
            might: 0,
            visibleStats: [0, 0, 0, 0, 0],
            refine: false,
            rearmed: false,
          },
          refine: {
            name: "",
            img: "",
            stats: [0, 0, 0, 0, 0],
          },
          assist: {
            name: "",
            unique: false,
          },
          special: {
            name: "",
            unique: false,
          },
          aSkill: {
            name: "",
            visibleStats: [0, 0, 0, 0, 0],
            unique: false,
          },
          bSkill: {
            name: "",
            unique: false,
          },
          cSkill: {
            name: "",
            unique: false,
          },
          sSkill: {
            name: "",
            visibleStats: [0, 0, 0, 0, 0],
          },
        },
      ];
      return { ...state };
    }
    case COPY_TAB: {
      const { id, length } = action.payload;
      var copiedHero = {};
      Object.assign(copiedHero, state.tabList[id]);
      state.key++;
      copiedHero.key = state.key;
      copiedHero.id = length;
      state.tabList = [...state.tabList, copiedHero];
      return { ...state };
    }
    case DELETE_TAB: {
      const { id } = action.payload;
      for (var i = id; i < state.tabList.length; i++) {
        state.tabList[i].key--;
        state.tabList[i].id--;
      }
      state.tabList.splice(id, 1);
      state.key = state.tabList.length;

      if (state.tabValue >= state.tabList.length) {
        state.tabValue--;
      }
      return { ...state };
    }
    case CHANGE_TAB: {
      const { id } = action.payload;
      return { ...state, tabValue: id };
    }
    case RESET_TAB: {
      const { id } = action.payload;
      state.tabList[id] = {
        key: state.tabList[id].key,
        id: state.tabList[id].id,
        value: null,
        label: "",
        hero: {
          name: "",
          singleName: "",
          title: "",
          VA: "",
          artist: "",
          hp: [],
          atk: [],
          spd: [],
          def: [],
          res: [],
          superboon: [],
          superbane: [],
          weapons: [],
          assists: [],
          specials: [],
          passives: [],
          weapon_type: "",
          move_type: "",
          hero_type: "",
          dragonflowers: 0,
          exists: false,
        },
        hp: "",
        atk: "",
        spd: "",
        def: "",
        res: "",
        levels: [1, 1, 1, 1, 1],
        asset: "",
        flaw: "",
        ascended: "",
        merges: 0,
        mergeOrder: [],
        mergedStats: [0, 0, 0, 0, 0],
        buffStats: [0, 0, 0, 0],
        dragonflowers: 0,
        dragonflowerStats: [0, 0, 0, 0, 0],
        resplendent: false,
        resplendentStats: false,
        resStats: [0, 0, 0, 0, 0],
        transformed: 0,
        blessing: "",
        blessingStats: [0, 0, 0, 0, 0],
        blessingHeroList: [],
        summonerSupport: "",
        summonerSupportStats: [0, 0, 0, 0, 0],
        allySupport: "",
        background: "",
        favorite: "",
        weapon: {
          name: "",
          might: 0,
          visibleStats: [0, 0, 0, 0, 0],
          refine: false,
          rearmed: false,
        },
        refine: {
          name: "",
          img: "",
          stats: [0, 0, 0, 0, 0],
        },
        assist: {
          name: "",
          unique: false,
        },
        special: {
          name: "",
          unique: false,
        },
        aSkill: {
          name: "",
          visibleStats: [0, 0, 0, 0, 0],
          unique: false,
        },
        bSkill: {
          name: "",
          unique: false,
        },
        cSkill: {
          name: "",
          unique: false,
        },
        sSkill: {
          name: "",
          visibleStats: [0, 0, 0, 0, 0],
        },
      };

      return { ...state };
    }

    // hero actions

    case CHANGE_HERO: {
      const { hero, id } = action.payload;
      state.tabList[id].hero = hero;
      state.tabList[id].label = hero.name;
      state.tabList[id].value = hero.character_id;
      state.tabList[id].resplendent = false;

      return { ...state };
    }

    case LOAD_BUILD_FROM_BARRACKS: {
      const { build, id } = action.payload;
      console.log(build);
      state.key++;
      var barracksHero = {};
      Object.assign(barracksHero, build);
      barracksHero.key = state.key;
      barracksHero.id = id;
      state.tabList[id] = barracksHero;
      return { ...state };
    }
    case CHANGE_STATS: {
      const { id } = action.payload;

      // get a new array based on the levels, but ensures that merges are taken into account
      var levels = [0, 0, 0, 0, 0];
      for (var j = 0; j < levels.length; j++) {
        if (state.tabList[id].merges > 0 && state.tabList[id].levels[j] === 0) {
          levels[j] = 1;
        } else {
          levels[j] = state.tabList[id].levels[j];
        }
      }

      // a skill visible stats (in case a skill is null)
      var visible = [0, 0, 0, 0, 0];
      if (state.tabList[id].aSkill.visibleStats !== undefined) {
        visible = state.tabList[id].aSkill.visibleStats;
      }

      // a variable to represent visible stats of equipped seals
      var visibleS = [0, 0, 0, 0, 0];
      if (state.tabList[id].sSkill.visibleStats !== undefined && state.tabList[id].sSkill.visibleStats.length !== 1) {
        visibleS = state.tabList[id].sSkill.visibleStats;
      }

      // weapon visible stats (in case weapon is null)
      var weaponStats = [0, 0, 0, 0, 0];
      if (state.tabList[id].weapon.visibleStats !== undefined) {
        weaponStats = state.tabList[id].weapon.visibleStats;
      }

      // refine visible stats (in case refine is null)
      var refineStats = [0, 0, 0, 0, 0];
      if (state.tabList[id].refine.stats !== undefined) {
        refineStats = state.tabList[id].refine.stats;
      }

      // calculates hero hp
      state.tabList[id].hp =
        state.tabList[id].hero.hp[3 + levels[0]] +
        state.tabList[id].mergedStats[0] +
        state.tabList[id].dragonflowerStats[0] +
        state.tabList[id].blessingStats[0] +
        weaponStats[0] +
        refineStats[0] +
        visible[0] +
        visibleS[0] +
        state.tabList[id].summonerSupportStats[0] +
        state.tabList[id].resStats[0];

      // calculates hero atk
      state.tabList[id].atk =
        state.tabList[id].hero.atk[3 + levels[1]] +
        state.tabList[id].mergedStats[1] +
        state.tabList[id].dragonflowerStats[1] +
        state.tabList[id].blessingStats[1] +
        state.tabList[id].weapon.might +
        weaponStats[1] +
        refineStats[1] +
        visible[1] +
        visibleS[1] +
        state.tabList[id].summonerSupportStats[1] +
        state.tabList[id].transformed +
        state.tabList[id].resStats[1] +
        state.tabList[id].buffStats[0];

      // calculates hero spd
      state.tabList[id].spd =
        state.tabList[id].hero.spd[3 + levels[2]] +
        state.tabList[id].mergedStats[2] +
        state.tabList[id].dragonflowerStats[2] +
        state.tabList[id].blessingStats[2] +
        weaponStats[2] +
        refineStats[2] +
        visible[2] +
        visibleS[2] +
        state.tabList[id].summonerSupportStats[2] +
        state.tabList[id].resStats[2] +
        state.tabList[id].buffStats[1];

      // calculates hero def
      state.tabList[id].def =
        state.tabList[id].hero.def[3 + levels[3]] +
        state.tabList[id].mergedStats[3] +
        state.tabList[id].dragonflowerStats[3] +
        state.tabList[id].blessingStats[3] +
        weaponStats[3] +
        refineStats[3] +
        visible[3] +
        visibleS[3] +
        state.tabList[id].summonerSupportStats[3] +
        state.tabList[id].resStats[3] +
        state.tabList[id].buffStats[2];

      // calculates hero res
      state.tabList[id].res =
        state.tabList[id].hero.res[3 + levels[4]] +
        state.tabList[id].mergedStats[4] +
        state.tabList[id].dragonflowerStats[4] +
        state.tabList[id].blessingStats[4] +
        weaponStats[4] +
        refineStats[4] +
        visible[4] +
        visibleS[4] +
        state.tabList[id].summonerSupportStats[4] +
        state.tabList[id].resStats[4] +
        state.tabList[id].buffStats[3];
      return { ...state };
    }
    case CHANGE_WEAPON: {
      const { weapon, id } = action.payload;
      state.tabList[id].weapon = weapon;
      return { ...state };
    }
    case CHANGE_REFINE: {
      const { refine, id } = action.payload;
      state.tabList[id].refine = refine;
      return { ...state };
    }
    case CHANGE_ASSIST: {
      const { assist, id } = action.payload;
      state.tabList[id].assist = assist;
      return { ...state };
    }
    case CHANGE_SPECIAL: {
      const { special, id } = action.payload;
      state.tabList[id].special = special;
      return { ...state };
    }
    case CHANGE_ASLOT: {
      const { a, id } = action.payload;
      state.tabList[id].aSkill = a;
      return { ...state };
    }
    case CHANGE_BSLOT: {
      const { b, id } = action.payload;
      state.tabList[id].bSkill = b;
      return { ...state };
    }
    case CHANGE_CSLOT: {
      const { c, id } = action.payload;
      state.tabList[id].cSkill = c;
      return { ...state };
    }
    case CHANGE_SSLOT: {
      const { s, id } = action.payload;
      state.tabList[id].sSkill = s;
      return { ...state };
    }
    case CHANGE_MERGES: {
      const { merges, order, id } = action.payload;
      state.tabList[id].merges = merges;
      state.tabList[id].mergeOrder = order;

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
      return { ...state };
    }
    case CHANGE_LEVELS: {
      const { levels, id, asset, flaw, ascended } = action.payload;
      state.tabList[id].levels = levels;
      state.tabList[id].asset = asset;
      state.tabList[id].flaw = flaw;
      state.tabList[id].ascended = ascended;
      return { ...state };
    }
    case CHANGE_DRAGONFLOWERS: {
      const { dragonflowers, id } = action.payload;
      state.tabList[id].dragonflowers = dragonflowers;

      tempArray = [0, 0, 0, 0, 0];
      if (dragonflowers !== null) {
        var index = 0;
        while (index < dragonflowers) {
          tempArray[index % 5] += 1;
          index++;
        }
        state.tabList[id].dragonflowerStats = tempArray;
      } else {
        state.tabList[id].dragonflowerStats = [0, 0, 0, 0, 0];
      }
      return { ...state };
    }
    case CHANGE_RESPLENDENT: {
      const { res, id } = action.payload;
      state.tabList[id].resplendent = res;
      return { ...state };
    }
    case CHANGE_RESPLENDENT_STATS: {
      const { res, id } = action.payload;
      tempArray = [0, 0, 0, 0, 0];
      if (res) {
        tempArray = [2, 2, 2, 2, 2];
      }
      state.tabList[id].resplendentStats = res;
      state.tabList[id].resStats = tempArray;
      return { ...state };
    }
    case CHANGE_TRANSFORMED: {
      const { transformed, id } = action.payload;
      if (transformed && state.tabList[id].hero.weapon_type.includes("Beast")) {
        state.tabList[id].transformed = 2;
      } else {
        state.tabList[id].transformed = 0;
      }
      return { ...state };
    }
    case CHANGE_BLESSING: {
      const { blessing, id } = action.payload;
      state.tabList[id].blessing = blessing;
      return { ...state };
    }
    case CHANGE_BLESSING_STATS: {
      const { stats, heroes, id } = action.payload;
      state.tabList[id].blessingStats = stats;
      state.tabList[id].blessingHeroList = heroes;
      return { ...state };
    }
    case CHANGE_SUMMONER_SUPPORT: {
      const { summoner_support, id } = action.payload;
      state.tabList[id].summonerSupport = summoner_support;
      var summonerSupportStats = [0, 0, 0, 0, 0];
      if (state.tabList[id].summonerSupport === "C") {
        summonerSupportStats = [3, 0, 0, 0, 2];
      } else if (state.tabList[id].summonerSupport === "B") {
        summonerSupportStats = [4, 0, 0, 2, 2];
      } else if (state.tabList[id].summonerSupport === "A") {
        summonerSupportStats = [4, 0, 2, 2, 2];
      } else if (state.tabList[id].summonerSupport === "S") {
        summonerSupportStats = [5, 2, 2, 2, 2];
      }
      state.tabList[id].summonerSupportStats = summonerSupportStats;
      return { ...state };
    }
    case CHANGE_ALLY_SUPPORT: {
      const { ally_support, id } = action.payload;
      state.tabList[id].allySupport = ally_support;
      return { ...state };
    }
    case CHANGE_BUFFED_STATS: {
      const { index, number, id } = action.payload;
      state.tabList[id].buffStats[index] = number;
      return { ...state };
    }
    case CHANGE_BACKGROUND: {
      const { bg, id } = action.payload;
      state.tabList[id].background = bg;
      return { ...state };
    }
    case CHANGE_FAVORITE: {
      const { fav, id } = action.payload;
      state.tabList[id].favorite = fav;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
}
