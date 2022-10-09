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
    hero_type: "",
  });

  const [stats, setStats] = useState(["", "", "", "", ""]);
  const [merges, setMerges] = useState(0);
  const [resplendent, setResplendent] = useState(false);
  const [blessing, setBlessing] = useState("");
  const [summonerSupport, setSummonerSupport] = useState("");
  const [allySupport, setAllySupport] = useState("");
  const [background, setBackground] = useState("");

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
      props.changeSummonerSupport(summonerSupport);
      props.changeAllySupport(allySupport);
    }
  }, [props.value, props.id]);

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
      refine: event.refine.img,
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

  const changeBackground = (event) => {
    setBackground(event);
    props.changeBackground(event);
  };

  return (
    <div hidden={props.value !== props.index}>
      <HeroComponent
        changeHero={changeHero}
        changeSkills={changeSkills}
        changeStats={changeStats}
        changeResplendent={changeResplendent}
        changeBlessing={changeBlessing}
        changeBackground={changeBackground}
        displayFloret={props.displayFloret}
        changeSummonerSupport={props.changeSummonerSupport}
        changeAllySupport={props.changeAllySupport}
        changeDragonflowers={props.changeDragonflowers}
      />
    </div>
  );
}
