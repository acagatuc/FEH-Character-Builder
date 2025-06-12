import * as actionTypes from "./actionTypes";

// herolist actions
export const fetchHeroList = (heroes) => ({
  type: actionTypes.FETCH_HERO_LIST,
  payload: {
    heroes: heroes,
  },
});

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

export const resetTab = (i) => ({
  type: actionTypes.RESET_TAB,
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

export const loadBuildFromBarracks = (b, id) => ({
  type: actionTypes.LOAD_BUILD_FROM_BARRACKS,
  payload: { build: b, id: id },
});

export const changeStats = (id) => ({
  type: actionTypes.CHANGE_STATS,
  payload: {
    id: id,
  },
});

export const changeWeapon = (w, id) => ({
  type: actionTypes.CHANGE_WEAPON,
  payload: {
    weapon: w,
    id: id,
  },
});
export const changeRefine = (r, id) => ({
  type: actionTypes.CHANGE_REFINE,
  payload: {
    refine: r,
    id: id,
  },
});
export const changeAssist = (a, id) => ({
  type: actionTypes.CHANGE_ASSIST,
  payload: {
    assist: a,
    id: id,
  },
});
export const changeSpecial = (s, id) => ({
  type: actionTypes.CHANGE_SPECIAL,
  payload: {
    special: s,
    id: id,
  },
});
export const changeASlot = (a, id) => ({
  type: actionTypes.CHANGE_ASLOT,
  payload: {
    a: a,
    id: id,
  },
});
export const changeBSlot = (b, id) => ({
  type: actionTypes.CHANGE_BSLOT,
  payload: {
    b: b,
    id: id,
  },
});
export const changeCSlot = (c, id) => ({
  type: actionTypes.CHANGE_CSLOT,
  payload: {
    c: c,
    id: id,
  },
});
export const changeSSlot = (s, id) => ({
  type: actionTypes.CHANGE_SSLOT,
  payload: {
    s: s,
    id: id,
  },
});

export const changeLevels = (levels, id, asset, flaw, ascended) => ({
  type: actionTypes.CHANGE_LEVELS,
  payload: {
    levels: levels,
    id: id,
    asset: asset,
    flaw: flaw,
    ascended: ascended,
  },
});

export const changeMerges = (merges, order, id) => ({
  type: actionTypes.CHANGE_MERGES,
  payload: {
    merges: merges,
    order: order,
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

export const changeResplendentStats = (res, id) => ({
  type: actionTypes.CHANGE_RESPLENDENT_STATS,
  payload: {
    res: res,
    id: id,
  },
});

export const changeTransformed = (transformed, id) => ({
  type: actionTypes.CHANGE_TRANSFORMED,
  payload: {
    transformed: transformed,
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
export const changeBlessingStats = (blessing, heroes, id) => ({
  type: actionTypes.CHANGE_BLESSING_STATS,
  payload: {
    stats: blessing,
    heroes: heroes,
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

export const changeBuffedStats = (index, number, id) => ({
  type: actionTypes.CHANGE_BUFFED_STATS,
  payload: {
    index: index,
    number: number,
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

// display actions
export const changeNameDisplay = (i) => ({
  type: actionTypes.CHANGE_NAME_DISPLAY,
  payload: {
    nameDisplay: i,
  },
});

export const changeGrima = (i) => ({
  type: actionTypes.CHANGE_GRIMA,
  payload: {
    grima: i,
  },
});

export const changeBackpack = (i) => ({
  type: actionTypes.CHANGE_BACKPACK,
  payload: {
    bp: i,
  },
});

export const changeFehnix = (i) => ({
  type: actionTypes.CHANGE_FEHNIX,
  payload: {
    fehnix: i,
  },
});

export const changeDuoDisplay = (i) => ({
  type: actionTypes.CHANGE_DUO_DISPLAY,
  payload: {
    display: i,
  },
});

export const changeGrouping = (i) => ({
  type: actionTypes.CHANGE_GROUPING_DISPLAY,
  payload: {
    grouped: i,
  },
});

export const changeTabImageDisplay = (i) => ({
  type: actionTypes.CHANGE_TAB_IMAGE_DISPLAY,
  payload: {
    display: i,
  },
});

// barracks actions
export const addBuildToBarracks = (title, i) => ({
  type: actionTypes.SAVE_BUILD_TO_BARRACKS,
  payload: { name: title, build: i },
});
export const deleteBuildFromBarracks = (i) => ({
  type: actionTypes.DELETE_BUILD_FROM_BARRACKS,
  payload: { id: i },
});
