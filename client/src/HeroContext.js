import React, { useState } from "react";

export const HeroContext = React.createContext({
  hero: {
    name: "",
    singleName: "",
    title: "",
    VA: "",
    artist: "",
    moveType: "",
    weaponType: "",
    hero_type: "",
  },
  stats: ["", "", "", "", ""],
  merges: 0,
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
});
