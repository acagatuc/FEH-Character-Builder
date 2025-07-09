import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "@mui/material";
import "./HeroComponent.css";

import {
  BlessingComponent,
  BlessingHeroSelectionComponent,
} from "./BlessingComponent.js";
// import BlessingHeroSelectionComponent from "./BlessingHeroSelectionComponent.js";

import HeroDropdown from "./HeroDropdown.js";
import WeaponComponent from "./WeaponComponent.js";
import SkillComponent from "./SkillComponent.js";
import Traits from "./Traits.js";
import Merges from "./Merges.js";
import FlowerComponent from "./FlowerComponent.js";
import SwitchComponent from "./SwitchComponent.js";
import ToggleComponent from "./ToggleComponent.js";
import BackgroundDropdown from "./BackgroundDropdown.js";
import FavoriteComponent from "./FavoriteComponent.js";
import BuffComponent from "./BuffComponent.js";

// save and load modals
import BarracksModal from "../modals/BarracksModal.js";
import SaveBuildModal from "../modals/SaveBuildModal.js";
import HeroInfoModal from "../modals/HeroInfoModal.js";
import RecommendedBuildsModal from "../modals/RecommendedBuildsModal.js";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { resetTab } from "../../rtk/tabsSlice.js";
import {
  changeHero,
  changeResplendent,
  changeResplendentStats,
  changeBlessing,
  changeBlessingStats,
} from "../../rtk/heroSlice.js";

// text arrows
import { left, right } from "../../assets/index.js";

export default function HeroComponent(props) {
  const dispatch = useDispatch();

  // hero info
  const hero = useSelector((state) => state.hero.heroes[props.id]);
  // const hp = useSelector((state) => state.tabList.tabList[props.id].hero.hp);
  // const atk = useSelector((state) => state.tabList.tabList[props.id].hero.atk);
  // const spd = useSelector((state) => state.tabList.tabList[props.id].hero.spd);
  // const def = useSelector((state) => state.tabList.tabList[props.id].hero.def);
  // const res = useSelector((state) => state.tabList.tabList[props.id].hero.res);

  // // redux skill info
  // const reduxWeapon = useSelector((state) => state.tabList.tabList[props.id].weapon);
  // const reduxRefine = useSelector((state) => state.tabList.tabList[props.id].refine);
  // const reduxAssist = useSelector((state) => state.tabList.tabList[props.id].assist);
  // const reduxSpecial = useSelector((state) => state.tabList.tabList[props.id].special);
  // const reduxA = useSelector((state) => state.tabList.tabList[props.id].aSkill);
  // const reduxB = useSelector((state) => state.tabList.tabList[props.id].bSkill);
  // const reduxC = useSelector((state) => state.tabList.tabList[props.id].cSkill);

  // // skill info for string loaded builds (recommended mostly)
  // const [weapon, setWeapon] = useState("");
  // const [refine, setRefine] = useState("");
  // const [assist, setAssist] = useState("");
  // const [special, setSpecial] = useState("");
  // const [aSlot, setASlot] = useState("");
  // const [bSlot, setBSlot] = useState("");
  // const [cSlot, setCSlot] = useState("");
  // const [sSlot, setSSlot] = useState("");

  // // support info
  // const SummonerSupport = useSelector((state) => state.tabList.tabList[props.id].summonerSupport);
  // const AllySupport = useSelector((state) => state.tabList.tabList[props.id].allySupport);

  // // assets flaws and ascended stats info
  // const levels = useSelector((state) => state.tabList.tabList[props.id].levels);
  // const superboon = useSelector((state) => state.tabList.tabList[props.id].hero.superboon);
  // const superbane = useSelector((state) => state.tabList.tabList[props.id].hero.superbane);
  // const asset = useSelector((state) => state.tabList.tabList[props.id].asset);
  // const flaw = useSelector((state) => state.tabList.tabList[props.id].flaw);
  // const ascended = useSelector((state) => state.tabList.tabList[props.id].ascended);

  // truthy values for resplendent and resplendent stat toggle buttons
  const resplendent = useSelector(
    (state) => state.hero.heroes[props.id]?.resplendent || false
  );
  const resplendentStats = useSelector(
    (state) => state.hero.heroes[props.id]?.resplendentStats || false
  );

  // // for beast units only
  // const transformed = useSelector((state) => state.tabList.tabList[props.id].transformed);

  // // length check on barracks for disabled state of save button
  // const barracksLength = useSelector((state) => state.barracks.key);
  const barracksLength = useState(1);

  // // loading variable to ensure that no state skill changes are committed while loading a new hero
  // const [recommendedBuilds, setRecommendedBuilds] = useState([]);

  // // skill lists from fetch request
  // const [loadedWeapons, setLoadedWeapons] = useState([]);
  // const [loadedAssists, setLoadedAssists] = useState([]);
  // const [loadedSpecials, setLoadedSpecials] = useState([]);
  // const [loadedA, setLoadedA] = useState([]);
  // const [loadedB, setLoadedB] = useState([]);
  // const [loadedC, setLoadedC] = useState([]);
  // const [loadedS, setLoadedS] = useState([]);

  // // for load modal
  const [showLoad, setShowLoad] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [showHeroInfo, setShowHeroInfo] = useState(false);
  const [showRecommendedBuilds, setShowRecommendedBuilds] = useState(false);
  const handleShowLoad = () => setShowLoad(true);
  const handleCloseLoad = () => setShowLoad(false);
  const handleShowSave = () => setShowSave(true);
  const handleCloseSave = () => setShowSave(false);
  const handleShowHeroInfo = () => setShowHeroInfo(true);
  const handleCloseHeroInfo = () => setShowHeroInfo(false);
  const handleShowRecommendedBuilds = () => setShowRecommendedBuilds(true);
  const handleCloseRecommendedBuilds = () => setShowRecommendedBuilds(false);

  //test thingy for loading on copy
  // const [test, setTest] = useState(false);

  async function heroChange(newHero) {
    // resets tab state in redux and all skill lists
    dispatch(resetTab(props.id));
    // setLoadedWeapons([]);
    // setLoadedAssists([]);
    // setLoadedSpecials([]);
    // setLoadedA([]);
    // setLoadedB([]);
    // setLoadedC([]);
    // setLoadedS([]);
    // setWeapon({ weapon: "", refine: "" });
    // setAssist("reset");
    // setSpecial("reset");
    // setASlot("reset");
    // setBSlot("reset");
    // setCSlot("reset");

    let response = await fetch(
      "http://localhost:5000/api/heroes/hero/" + newHero.hero_id
    );
    response = await response.json();

    // if there are no recommended builds, just set it equal to an empty array
    // if (response["recommended"] !== null) {
    //   setRecommendedBuilds(response["recommended"]);
    // }
    //get all possible skills on call? Instead of in multiple calls in children?
    // response["hero"]["exists"] = true;
    // response["hero"].VA = response["hero"].EVA;
    // response["hero"].character_id = newHero;

    // setTest(true);
    dispatch(
      changeHero({ hero: response[0], id: props.id, resplendent: false })
    );

    // var weapon = response["hero"]["weapon_type"];
    // if (weapon.includes("Dragon") || weapon.includes("Beast") || weapon.includes("Bow") || weapon.includes("Dagger")) {
    //   weapon = weapon.split(" ")[1];
    // }

    // var urlAddon = response["hero"]["move_type"] + "/" + weapon + "/" + newHero;
    // let skills = await fetch("http://localhost:5000/AllSkills/" + urlAddon);
    // skills = await skills.json();
    // setLoadedWeapons(skills["weaponList"]);
    // setLoadedAssists(skills["assistList"]);
    // setLoadedSpecials(skills["specialList"]);
    // setLoadedA(skills["aList"]);
    // setLoadedB(skills["bList"]);
    // setLoadedC(skills["cList"]);
    // setLoadedS(skills["sList"]);

    // dispatch(actions.changeLevels([1, 1, 1, 1, 1], props.id));
  }

  // this useeffect occurs if the tab is copied from another tab, and doesnt undergo the heroChange function
  // useEffect(() => {
  //   async function loadSkillLists() {
  //     var weapon = hero.weapon_type;
  //     if (weapon.includes("Dragon") || weapon.includes("Beast") || weapon.includes("Bow") || weapon.includes("Dagger")) {
  //       weapon = weapon.split(" ")[1];
  //     }

  //     var urlAddon = hero.move_type + "/" + weapon + "/" + hero._id;
  //     let skills = await fetch("http://localhost:5000/AllSkills/" + urlAddon);
  //     skills = await skills.json();
  //     setLoadedWeapons(skills["weaponList"]);
  //     setLoadedAssists(skills["assistList"]);
  //     setLoadedSpecials(skills["specialList"]);
  //     setLoadedA(skills["aList"]);
  //     setLoadedB(skills["bList"]);
  //     setLoadedC(skills["cList"]);
  //     setLoadedS(skills["sList"]);

  //     dispatch(actions.changeLevels([1, 1, 1, 1, 1], props.id));
  //   }

  //   if (!test && hero.name !== "") {
  //     loadSkillLists();
  //     if (reduxWeapon.name !== "") {
  //       setWeapon({ weapon: reduxWeapon, refine: reduxRefine });
  //     }
  //     if (reduxAssist.name !== "") {
  //       setAssist(reduxAssist);
  //     }
  //     if (reduxSpecial.name !== "") {
  //       setSpecial(reduxSpecial);
  //     }
  //     if (reduxA.name !== "") {
  //       setASlot(reduxA);
  //     }
  //     if (reduxB.name !== "") {
  //       setBSlot(reduxB);
  //     }
  //     if (reduxC.name !== "") {
  //       setCSlot(reduxC);
  //     }
  //   }
  // }, [hero.name]);

  // async function loadBuild(build) {
  //   // resets the tab to accomodate a different build
  //   dispatch(actions.resetTab(props.id));
  //   var buildFromBarracks = {};
  //   Object.assign(buildFromBarracks, build);

  //   // gets the hero from the db to check if there have been any changes (like skills)
  //   await heroChange(buildFromBarracks.value);

  //   setWeapon({ weapon: build.weapon, refine: build.refine });
  //   setAssist(build.assist);
  //   setSpecial(build.special);
  //   setASlot(build.aSkill);
  //   setBSlot(build.bSkill);
  //   setCSlot(build.cSkill);
  //   setSSlot(build.sSkill);

  //   // load the hero and build into the current tab
  //   dispatch(actions.loadBuildFromBarracks(buildFromBarracks, props.id));
  // }

  // function loadRecommendedBuild(build) {
  //   setWeapon({ weapon: build.weapon, refine: build.refine });
  //   setAssist(build.assist);
  //   setSpecial(build.special);
  //   setASlot(build.a);
  //   setBSlot(build.b);
  //   setCSlot(build.c);
  //   setSSlot(build.s);

  //   var tempLevels = [1, 1, 1, 1, 1];
  //   switch (build.asset) {
  //     case "hp":
  //       tempLevels[0] = 2;
  //       break;
  //     case "atk":
  //       tempLevels[1] = 2;
  //       break;
  //     case "spd":
  //       tempLevels[2] = 2;
  //       break;
  //     case "def":
  //       tempLevels[3] = 2;
  //       break;
  //     case "res":
  //       tempLevels[4] = 2;
  //       break;
  //     default:
  //       break;
  //   }
  //   switch (build.ascended) {
  //     case "hp":
  //       tempLevels[0] = 2;
  //       break;
  //     case "atk":
  //       tempLevels[1] = 2;
  //       break;
  //     case "spd":
  //       tempLevels[2] = 2;
  //       break;
  //     case "def":
  //       tempLevels[3] = 2;
  //       break;
  //     case "res":
  //       tempLevels[4] = 2;
  //       break;
  //     default:
  //       break;
  //   }
  //   switch (build.flaw) {
  //     case "hp":
  //       tempLevels[0] = 0;
  //       break;
  //     case "atk":
  //       tempLevels[1] = 0;
  //       break;
  //     case "spd":
  //       tempLevels[2] = 0;
  //       break;
  //     case "def":
  //       tempLevels[3] = 0;
  //       break;
  //     case "res":
  //       tempLevels[4] = 0;
  //       break;
  //     default:
  //       break;
  //   }
  //   dispatch(actions.changeLevels(tempLevels, props.id, build.asset, build.flaw, build.ascended));
  //   maximize();
  // }

  // useEffect(() => {
  //   dispatch(actions.changeStats(props.id));
  // }, [hero, hp, atk, spd, def, res]);

  // // button features
  // const maximize = () => {
  //   mergeChange(10);
  //   var index = +hero.dragonflowers;
  //   flowerChange(index);
  // };

  // const skills = () => {
  //   // must find a way to have the program take a fuckin chill pill when clicked before the hero is properly loaded in
  //   // load in the top skills to the specified skill slots.
  //   // find a way to load skills more than once lol ????
  //   if (weapon.name !== hero.weapons[hero.weapons.length - 1]) {
  //     // if (reduxWeapon.name !== weapon.weapon) {
  //     setWeapon({ weapon: hero.weapons[hero.weapons.length - 1], refine: "Effect" });
  //   }
  //   if (hero.assists[0] !== undefined && assist !== hero.assists[hero.assists.length - 1]) {
  //     setAssist(hero.assists[hero.assists.length - 1]);
  //   }
  //   if (hero.specials[0] !== undefined && special !== hero.specials[hero.specials.length - 1]) {
  //     setSpecial(hero.specials[hero.specials.length - 1]);
  //   }
  //   if (hero.a[0] !== undefined && aSlot !== hero.a[hero.a.length - 1]) {
  //     setASlot(hero.a[hero.a.length - 1]);
  //   }
  //   if (hero.b[0] !== undefined && bSlot !== hero.b[hero.b.length - 1]) {
  //     setBSlot(hero.b[hero.b.length - 1]);
  //   }
  //   if (hero.c[0] !== undefined && cSlot !== hero.c[hero.c.length - 1]) {
  //     setCSlot(hero.c[hero.c.length - 1]);
  //   }
  // };

  const handleMerge = (number) => {
  //   var tempArray = [];
  //   var mergeTemp = [];

  //   tempArray.push(0);
  //   tempArray.push(parseInt(hero.atk[levels[1]]));
  //   tempArray.push(parseInt(hero.spd[levels[2]]));
  //   tempArray.push(parseInt(hero.def[levels[3]]));
  //   tempArray.push(parseInt(hero.res[levels[4]]));

  //   mergeTemp.push(0);
  //   var i = 0;
  //   while (i < 4) {
  //     var index = tempArray.indexOf(Math.max(...tempArray));
  //     mergeTemp.push(index);
  //     tempArray[index] = 0;
  //     i += 1;
  //   }
    dispatch(changeMerges(number, mergeTemp, props.id));
    dispatch(changeStats(props.id));
  };

  // const flowerChange = (value) => {
  //   dispatch(actions.changeDragonflowers(value, props.id));
  //   dispatch(actions.changeStats(props.id));
  // };

  // const assetChange = (array, a) => {
  //   dispatch(actions.changeLevels(array, props.id, a, flaw, ascended));
  //   dispatch(actions.changeStats(props.id));
  // };

  // const flawChange = (array, f) => {
  //   dispatch(actions.changeLevels(array, props.id, asset, f, ascended));
  //   dispatch(actions.changeStats(props.id));
  // };

  // const ascendedChange = (array, a) => {
  //   dispatch(actions.changeLevels(array, props.id, asset, flaw, a));
  //   dispatch(actions.changeStats(props.id));
  // };

  // const changeWeapon = (w) => {
  //   dispatch(actions.changeWeapon(w, props.id));
  //   dispatch(actions.changeStats(props.id));
  // };

  // const changeRefine = (r, weapon) => {
  //   // determine stats for array from here
  //   if (r === null) {
  //     dispatch(actions.changeRefine({ name: "", img: "", stats: [0, 0, 0, 0, 0] }, props.id));
  //   } else {
  //     var url = r.label.replace("+", "%2B");
  //     if (r.label.includes("Effect")) {
  //       url = weapon;
  //     }
  //     dispatch(actions.changeRefine({ name: r.label, stats: r.value, img: "https://fehskills.s3.amazonaws.com/" + url + ".png" }, props.id));
  //   }
  //   dispatch(actions.changeStats(props.id));
  // };

  // const changeAssist = (a) => {
  //   setAssist("");
  //   dispatch(actions.changeAssist(a, props.id));
  // };

  // const changeSpecial = (s) => {
  //   setSpecial("");
  //   dispatch(actions.changeSpecial(s, props.id));
  // };

  // const changeASkill = (a) => {
  //   setASlot("");
  //   dispatch(actions.changeASlot(a, props.id));
  //   dispatch(actions.changeStats(props.id));
  // };

  // const changeBSkill = (b) => {
  //   setBSlot("");
  //   dispatch(actions.changeBSlot(b, props.id));
  // };

  // const changeCSkill = (c) => {
  //   setCSlot("");
  //   dispatch(actions.changeCSlot(c, props.id));
  // };

  // const changeSSkill = (s) => {
  //   setSSlot("");
  //   dispatch(actions.changeSSlot(s, props.id));
  //   dispatch(actions.changeStats(props.id));
  // };

  const handleBlessing = (b) => {
    dispatch(changeBlessing({ blessing: b, id: props.id }));
  };

  const handleBlessingStats = (buffs, heroes) => {
    dispatch(changeBlessingStats(buffs, heroes, props.id));
    // dispatch(changeStats(props.id));
  };

  // const changeSummonerSupport = (event) => {
  //   dispatch(actions.changeSS(event, props.id));
  //   dispatch(actions.changeStats(props.id));
  // };

  // const changeAllySupport = (event) => {
  //   dispatch(actions.changeAS(event, props.id));
  // };

  // const handleTransform = (event) => {
  //   dispatch(actions.changeTransformed(event, props.id));
  //   dispatch(actions.changeStats(props.id));
  // };

  // const changeBuffedStats = (statIndex, number) => {
  //   dispatch(actions.changeBuffedStats(statIndex, number, props.id));
  //   dispatch(actions.changeStats(props.id));
  // };

  // const changeBackground = (bg) => {
  //   dispatch(actions.changeBackground(bg, props.id));
  // };

  // const changeFavorite = (fav) => {
  //   dispatch(actions.changeFavorite(fav, props.id));
  // };

  const toggleResplendent = (r) => {
    dispatch(changeResplendent({ r: r, id: props.id }));
  };

  const handleResplendentStats = (r) => {
    dispatch(changeResplendentStats({ r: r, id: props.id }));
    //   dispatch(actions.changeStats(props.id));
  };

  return (
    <div className="hero-component">
      {/* <div className="load-save-row">
        <Button variant="contained" color="primary" style={{ marginRight: "5px" }} onClick={handleShowLoad}>
          Load
        </Button>
        <Tooltip title="Barracks are full!" placement="top" disableTouchListener={true} disableHoverListener={barracksLength !== 12}>
          <div>
            <Button variant="contained" color="primary" disabled={!hero.exists || barracksLength === 12} onClick={handleShowSave}>
              Save
            </Button>
          </div>
        </Tooltip> */}
      {/* <SaveBuildModal show={showSave} onClose={handleCloseSave} tab={tab} />
        <BarracksModal show={showLoad} onClose={handleCloseLoad} loadBuild={loadBuild} id={props.id} /> */}
      {/* </div> */}
      <div className="column hero-stats-column">
        <div className="header-row">
          <div className="headers">Hero:</div>
          {/* <Button className="maximize-button" variant="contained" color="primary" disabled={!hero.exists} onClick={maximize}>
            Maximize
          </Button> */}
        </div>
        <HeroDropdown
          onChange={heroChange}
          title={"Select Hero"}
          id={props.id}
        />
        <Merges
          hero={hero}
          onChange={handleMerge}
          placeholder={"Merges"}
          id={props.id}
        />
        <BlessingComponent
          placeholder={"Blessing"}
          onChange={handleBlessing}
          id={props.id}
        />
        <BlessingHeroSelectionComponent
          onChange={handleBlessingStats}
          id={props.id}
        />
        <SwitchComponent
          res={resplendent}
          enabled={hero?.hasResplendent || false}
          onChange={toggleResplendent}
          label={"Resplendent Art"}
        />
        <SwitchComponent
          res={resplendentStats}
          enabled={hero?.hasResplendent || false}
          onChange={handleResplendentStats}
          label={"Resplendent Stats"}
        />
      </div>
    </div>
  );
}

// <div className="flex-row" style={{ justifyContent: "space-between" }}>
//           <Merges hero={hero} levels={levels} onChange={mergeChange} placeholder={"Merges"} id={props.id} />
//           <FlowerComponent hero={hero} onChange={flowerChange} id={props.id} />
//         </div>
//         <div className="flex-row" style={{ justifyContent: "space-between" }}>
//           <Traits
//             hero={hero}
//             stat={asset}
//             stats={superboon}
//             array={levels}
//             color={"#79ba8e"}
//             label={"+"}
//             onChange={assetChange}
//             placeholder={"Asset"}
//           />
//           <Traits hero={hero} stat={flaw} stats={superbane} array={levels} color={"#e68585"} label={"-"} onChange={flawChange} placeholder={"Flaw"} />
//           <Traits
//             hero={hero}
//             stat={ascended}
//             stats={superboon}
//             array={levels}
//             color={"#79ba8e"}
//             label={"+"}
//             onChange={ascendedChange}
//             placeholder={"Ascended"}
//           />
//         </div>
//         <div className="header-row" style={{ marginTop: "10px" }}>
//           <div className="headers">Skills:</div>
//           <Button className="skills-button" variant="contained" color="primary" disabled={!hero.exists} onClick={skills}>
//             Skills
//           </Button>
//         </div>
//         <WeaponComponent hero={hero} weapons={loadedWeapons} onChangeW={changeWeapon} onChangeR={changeRefine} stringWeapon={weapon} id={props.id} />
//         <SkillComponent
//           hero={hero}
//           skill={assist}
//           heroSkills={hero.assists}
//           id={props.id}
//           onChange={changeAssist}
//           skills={loadedAssists}
//           placeholder={"Choose Assist"}
//         />
//         <SkillComponent
//           hero={hero}
//           skill={special}
//           heroSkills={hero.specials}
//           id={props.id}
//           onChange={changeSpecial}
//           skills={loadedSpecials}
//           placeholder={"Choose Special"}
//         />
//         <SkillComponent
//           hero={hero}
//           skill={aSlot}
//           heroSkills={hero.a}
//           id={props.id}
//           onChange={changeASkill}
//           skills={loadedA}
//           placeholder={"Choose A Skill"}
//         />
//         <SkillComponent
//           hero={hero}
//           skill={bSlot}
//           heroSkills={hero.b}
//           id={props.id}
//           onChange={changeBSkill}
//           skills={loadedB}
//           placeholder={"Choose B Skill"}
//         />
//         <SkillComponent
//           hero={hero}
//           skill={cSlot}
//           heroSkills={hero.c}
//           id={props.id}
//           onChange={changeCSkill}
//           skills={loadedC}
//           placeholder={"Choose C Skill"}
//         />
//         <SkillComponent
//           hero={hero}
//           skill={sSlot}
//           heroSkills={[]}
//           id={props.id}
//           onChange={changeSSkill}
//           skills={loadedS}
//           placeholder={"Choose S Skill"}
//         />
//       </div>
//       <div className="screen-divider"></div>
//       <div className="additional-col">
//         <div className="column additional-column-1">
//           <h5 className="additional-columns-title">Additional:</h5>
//           <BlessingComponent hero={hero} placeholder={"Blessing"} onChange={changeBlessing} id={props.id} />
//           <BlessingHeroSelectionComponent hero={hero} onChange={changeBlessingStats} id={props.id} />
//           <ToggleComponent currentState={SummonerSupport} exists={hero.exists} label={"Summoner Support:"} onChange={changeSummonerSupport} />
//           <ToggleComponent currentState={AllySupport} exists={hero.exists} label={"Ally Support:"} onChange={changeAllySupport} />
//           <SwitchComponent res={transformed === 2} enabled={hero.weapon_type.includes("Beast")} onChange={handleTransform} label={"Transformed?"} />
//           <SwitchComponent res={resplendent} enabled={hero.artist[1]} onChange={changeResplendent} label={"Resplendant Art"} />
//           <SwitchComponent res={resplendentStats} enabled={hero.name !== ""} onChange={handleResplendentStats} label={"Resplendant Stats"} />
//         </div>
//         <div className="screen-divider-2"></div>
//         <div className="column additional-column-2">
//           <BuffComponent hero={hero} onChange={changeBuffedStats} />
//           <BackgroundDropdown hero={hero} placeholder={"Background"} onChange={changeBackground} id={props.id} />
//           <FavoriteComponent hero={hero} placeholder={"Favorite"} onChange={changeFavorite} id={props.id} />
//         </div>
//       </div>
//       <div className="column footer-column footer-title">
//         <div className="footer-row">
//           <img src={left} alt="left arrow" className="arrow" />
//           Additional Information
//           <img src={right} alt="right arrow" className="arrow" />
//         </div>
//         <div className="menu-row">
//           <Button variant="contained">UI Changes</Button>
//           <Button variant="contained" onClick={handleShowRecommendedBuilds} disabled={!hero.exists}>
//             Recommended Builds
//           </Button>
//           <RecommendedBuildsModal
//             show={showRecommendedBuilds}
//             onClose={handleCloseRecommendedBuilds}
//             hero={hero}
//             recommended={recommendedBuilds}
//             loadBuild={loadRecommendedBuild}
//           />
//           <Button variant="contained" onClick={handleShowHeroInfo} disabled={!hero.exists}>
//             Hero info
//           </Button>
//           <HeroInfoModal show={showHeroInfo} onClose={handleCloseHeroInfo} hero={hero} />
//         </div>
//       </div>
