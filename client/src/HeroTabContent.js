import React, { useState, useEffect } from "react";
import { Tabs, Tab, TabContentPanel } from "@mui/material";
import HeroComponent from "./components/HeroComponent.js";
import HeroCanvas from "./components/HeroCanvas.js";

export default function HeroTabContent(props) {
  const [sendHero, setSendHero] = useState({
    name: "",
    singleName: "",
    title: "",
    VA: "",
    artist: "",
    moveType: "",
    weaponType: "",
  });

  const [stats, setStats] = useState(["", "", "", "", ""]);
  const [merges, setMerges] = useState(0);
  const [resplendent, setResplendent] = useState(false);
  const [blessing, setBlessing] = useState("");

  const [skills, setSkills] = useState({
    weapon: "",
    refine: "",
    aSkill: "",
    assist: "",
    bSkill: "",
    cSkill: "",
    sSkill: "",
    special: "",
  });

  useEffect(() => {
    if (props.value === props.index) {
      props.onChange(sendHero);
      props.changeSkills(skills);
      props.changeStats(stats, merges);
      props.changeResplendent(resplendent);
      props.changeBlessing(blessing);
    }
  }, [props.value]);

  const changeHero = (event) => {
    setSendHero(event);
    props.onChange(event);
  };

  const changeSkills = (event) => {
    var newObj = {
      aSkill: event.aSkill.name,
      assist: event.assist.name,
      bSkill: event.bSkill.name,
      cSkill: event.cSkill.name,
      refine: event.refine.name,
      sSkill: event.sSkill.name,
      special: event.special.name,
      weapon: event.weapon.name,
    };
    setSkills(newObj);
    props.changeSkills(newObj);
  };

  const changeStats = (stats, merges, levels) => {
    setStats(stats);
    setMerges(merges);
    props.changeStats(stats, merges, levels);
  };

  const changeResplendent = (event) => {
    setResplendent(event);
    props.changeResplendent(event);
  };

  const changeBlessing = (event) => {
    setBlessing(event);
    props.changeBlessing(event);
  };

  return (
    <div hidden={props.value !== props.index}>
      <HeroComponent
        changeHero={changeHero}
        changeSkills={changeSkills}
        changeStats={changeStats}
        changeResplendent={changeResplendent}
        changeBlessing={changeBlessing}
      />
    </div>
  );
}
