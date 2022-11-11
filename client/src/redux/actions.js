import * as actionTypes from "./actionTypes";

// tablist actions
export const addTab = (i) => ({
  type: actionTypes.ADD_TAB,
  payload: {
    id: i,
  },
});

export const copyTab = (id, length) => ({
  type: actionTypes.COPY_TAB,
  payload: {
    id: id,
    length: length,
  },
});

export const updateTab = (list) => ({
  type: actionTypes.UPDATE_TABLIST,
  payload: {
    list: list,
  },
});

export const deleteTab = (i) => ({
  type: actionTypes.DELETE_TAB,
  payload: {
    id: i,
  },
});

export const changeTab = (i) => ({
  type: actionTypes.CHANGE_TAB,
  payload: {
    id: i,
  },
});

// herolist actions
export const changeHero = (hero, id) => ({
  type: actionTypes.CHANGE_HERO,
  payload: {
    hero: hero,
    id: id,
  },
});

export const changeStats = (stats, id) => ({
  type: actionTypes.CHANGE_STATS,
  payload: {
    stats: stats,
    id: id,
  },
});

export const changeSkills = (skills, id) => ({
  type: actionTypes.CHANGE_SKILLS,
  payload: {
    skills: skills,
    id: id,
  },
});

export const changeLevels = (levels, id) => ({
  type: actionTypes.CHANGE_LEVELS,
  payload: {
    levels: levels,
    id: id,
  },
});

export const changeMerges = (merges, id) => ({
  type: actionTypes.CHANGE_MERGES,
  payload: {
    merges: merges,
    id: id,
  },
});

export const changeDragonflowers = (df, id) => ({
  type: actionTypes.CHANGE_DRAGONFLOWERS,
  payload: {
    dragonflowers: df,
    id: id,
  },
});

export const changeResplendent = (res, id) => ({
  type: actionTypes.CHANGE_RESPLENDENT,
  payload: {
    res: res,
    id: id,
  },
});

export const changeBlessing = (blessing, id) => ({
  type: actionTypes.CHANGE_BLESSING,
  payload: {
    blessing: blessing,
    id: id,
  },
});

export const changeSS = (ss, id) => ({
  type: actionTypes.CHANGE_SUMMONER_SUPPORT,
  payload: {
    summoner_support: ss,
    id: id,
  },
});

export const changeAS = (as, id) => ({
  type: actionTypes.CHANGE_ALLY_SUPPORT,
  payload: {
    ally_support: as,
    id: id,
  },
});

export const changeBackground = (bg, id) => ({
  type: actionTypes.CHANGE_BACKGROUND,
  payload: {
    bg: bg,
    id: id,
  },
});

export const changeFavorite = (fav, id) => ({
  type: actionTypes.CHANGE_FAVORITE,
  payload: {
    fav: fav,
    id: id,
  },
});
