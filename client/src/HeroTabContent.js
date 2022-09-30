import React, { useState, useEffect } from "react";
import { Tabs, Tab, TabContentPanel } from "@mui/material";
import HeroComponent from "./components/HeroComponent.js";
import HeroCanvas from "./components/HeroCanvas.js";

export default function HeroTabContent(props) {
  const [sendHero, setSendHero] = useState({
    name: "",
    singleName: "",
    title: "",
    merges: 0,
    totalStats: [0, 0, 0, 0, 0],
    VA: "",
    artist: "",
    moveType: "",
    weaponType: "",
    blessing: "",
    resplendent: false,
    weapon: "",
    refine: "",
    assist: "",
    special: "",
    aSkill: "",
    bSkill: "",
    cSkill: "",
    sSkill: "",
  });

  useEffect(() => {
    if (props.value === props.index) {
      props.onChange(sendHero);
    }
  }, [props.value]);

  const changeHero = (event) => {
    setSendHero(event);
    props.onChange(event);
  };

  const changeSkills = (event) => {
    props.changeSkills(event);
  };

  const changeStats = (event) => {
    props.changeStats(event);
  };

  const changeResplendent = (event) => {
    //setResplendent(event);
  };

  return (
    <div hidden={props.value !== props.index}>
      <HeroComponent
        changeHero={changeHero}
        changeSkills={changeSkills}
        changeStats={changeStats}
        changeResplendent={changeResplendent}
      />
    </div>
  );
}
