import {
  ADD_TAB,
  COPY_TAB,
  DELETE_TAB,
  UPDATE_TABLIST,
  CHANGE_TAB,
  CHANGE_HERO,
  CHANGE_STATS,
  CHANGE_SKILLS,
  CHANGE_MERGES,
  CHANGE_LEVELS,
  CHANGE_DRAGONFLOWERS,
  CHANGE_RESPLENDENT,
  CHANGE_BLESSING,
  CHANGE_SUMMONER_SUPPORT,
  CHANGE_ALLY_SUPPORT,
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
      merges: 0,
      dragonflowers: 0,
      resplendent: false,
      blessing: "",
      summonerSupport: "",
      allySupport: "",
      background: "",
      favorite: "",
      weapon: "",
      refine: "",
      aSkill: "",
      assist: "",
      bSkill: "",
      cSkill: "",
      sSkill: "",
      special: "",
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
          merges: 0,
          dragonflowers: 0,
          resplendent: false,
          blessing: "",
          summonerSupport: "",
          allySupport: "",
          background: "",
          favorite: "",
          weapon: "",
          refine: "",
          aSkill: "",
          assist: "",
          bSkill: "",
          cSkill: "",
          sSkill: "",
          special: "",
        },
      ];
      return { ...state };
    }
    case COPY_TAB: {
      const { id, length } = action.payload;
      state.key++;
      var copiedHero = {
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
        stats: ["", "", "", "", ""],
        merges: 0,
        dragonflowers: 0,
        resplendent: false,
        blessing: "",
        summonerSupport: "",
        allySupport: "",
        background: "",
        favorite: "",
        skills: {
          weapon: "",
          refine: "",
          aSkill: "",
          assist: "",
          bSkill: "",
          cSkill: "",
          sSkill: "",
          special: "",
        },
      };
      Object.assign(copiedHero.hero, state.tabList[id].hero);
      copiedHero.key = state.key;
      copiedHero.id = length;
      copiedHero.label = state.tabList[id].label;
      copiedHero.hero = state.tabList[id].hero;
      copiedHero.blessing = state.tabList[id].blessing;
      copiedHero.summonerSupport = state.tabList[id].summonerSupport;
      copiedHero.allySupport = state.tabList[id].allySupport;
      copiedHero.value = state.tabList[id].value;
      copiedHero.label = state.tabList[id].label;
      state.tabList = [...state.tabList, copiedHero];
      return { ...state };
    }
    case UPDATE_TABLIST: {
      const { list } = action.payload;
      Object.assign(state.tabList, list);
      return { ...state, tabList: list };
    }
    case DELETE_TAB: {
      return { ...state };
    }
    case CHANGE_TAB: {
      const { id } = action.payload;
      return { ...state, tabValue: id };
    }

    // hero actions

    case CHANGE_HERO: {
      const { hero, id } = action.payload;
      state.tabList[id].hero = hero;
      state.tabList[id].label = hero.name;
      state.tabList[id].value = hero.character_id;
      return { ...state };
    }
    case CHANGE_STATS: {
      const { stats, id } = action.payload;
      state.tabList[id].hp = stats[0];
      state.tabList[id].atk = stats[1];
      state.tabList[id].spd = stats[2];
      state.tabList[id].def = stats[3];
      state.tabList[id].res = stats[4];
      return { ...state };
    }
    case CHANGE_SKILLS: {
      const { skills, id } = action.payload;
      state.tabList[id].weapon = skills.weapon;
      state.tabList[id].refine = skills.refine;
      state.tabList[id].assist = skills.assist;
      state.tabList[id].special = skills.special;
      state.tabList[id].aSkill = skills.aSkill;
      state.tabList[id].bSkill = skills.bSkill;
      state.tabList[id].cSkill = skills.cSkill;
      state.tabList[id].sSkill = skills.sSkill;
      return { ...state };
    }
    case CHANGE_MERGES: {
      const { merges, id } = action.payload;
      state.tabList[id].merges = merges;
      return { ...state };
    }
    case CHANGE_LEVELS: {
      const { levels, id } = action.payload;
      state.tabList[id].levels = levels;
      return { ...state };
    }
    case CHANGE_DRAGONFLOWERS: {
      const { dragonflowers, id } = action.payload;
      state.tabList[id].dragonflowers = dragonflowers;
      return { ...state };
    }
    case CHANGE_RESPLENDENT: {
      const { res, id } = action.payload;
      state.tabList[id].resplendent = res;
      return { ...state };
    }
    case CHANGE_BLESSING: {
      const { blessing, id } = action.payload;
      state.tabList[id].blessing = blessing;
      return { ...state };
    }
    case CHANGE_SUMMONER_SUPPORT: {
      const { summoner_support, id } = action.payload;
      state.tabList[id].summonerSupport = summoner_support;
      return { ...state };
    }
    case CHANGE_ALLY_SUPPORT: {
      const { ally_support, id } = action.payload;
      state.tabList[id].allySupport = ally_support;
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

/**export const CHANGE_MERGES = "CHANGE_MERGES";
export const CHANGE_DRAGONFLOWERS = "CHANGE_DRAGONFLOWERS";
export const CHANGE_RESPLENDENT = "CHANGE_RESPLENDENT";
export const CHANGE_BLESSING = "CHANGE_BLESSING";
export const CHANGE_SUMMONER_SUPPORT = "CHANGE_SUMMONER_SUPPORT";
export const CHANGE_ALLY_SUPPORT = "CHANGE_ALLY_SUPPORT";
export const CHANGE_BACKGROUND = "CHANGE_BACKGROUND";
export const CHANGE_FAVORITE = "CHANGE_FAVORITE" */
