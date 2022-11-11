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

export const HeroContextProvider = (props) => {
  const setHero = (currentHero) => {
    setState({ ...state, hero: currentHero });
  };

  const initState = {
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
  };

  const [state, setState] = useState(initState);

  return <HeroContext.Provider value={state}>{props.children}</HeroContext.Provider>;
};
