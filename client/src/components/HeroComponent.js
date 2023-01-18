import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Button, Tooltip } from "@mui/material";
import "./../App.css";

import BlessingComponent from "./BlessingComponent.js";
import BlessingHeroSelectionComponent from "./BlessingHeroSelectionComponent.js";

import Dropdown from "./Dropdown.js";
import WeaponComponent from "./WeaponComponent.js";
import SkillComponent from "./SkillComponent.js";
import Traits from "./Traits.js";
import Merges from "./Merges.js";
import FlowerComponent from "./FlowerComponent.js";
import SwitchComponent from "./SwitchComponent.js";
import ToggleComponent from "./ToggleComponent.js";
import BackgroundDropdown from "./BackgroundDropdown.js";
import FavoriteComponent from "./FavoriteComponent.js";

// save and load modals
import BarracksModal from "./BarracksModal.js";
import SaveBuildModal from "./SaveBuildModal.js";
import HeroInfoModal from "./HeroInfoModal.js";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions";

// text arrows
import { left, right } from "./../assets";

export default function HeroComponent(props) {
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.tabList.tabList[props.id]);

  // hero info
  const hero = useSelector((state) => state.tabList.tabList[props.id].hero);
  const hp = useSelector((state) => state.tabList.tabList[props.id].hero.hp);
  const atk = useSelector((state) => state.tabList.tabList[props.id].hero.atk);
  const spd = useSelector((state) => state.tabList.tabList[props.id].hero.spd);
  const def = useSelector((state) => state.tabList.tabList[props.id].hero.def);
  const res = useSelector((state) => state.tabList.tabList[props.id].hero.res);

  // skill info
  const weapon = useSelector((state) => state.tabList.tabList[props.id].weapon);
  const assist = useSelector((state) => state.tabList.tabList[props.id].assist);
  const special = useSelector((state) => state.tabList.tabList[props.id].special);
  const aSlot = useSelector((state) => state.tabList.tabList[props.id].aSkill);
  const bSlot = useSelector((state) => state.tabList.tabList[props.id].bSkill);
  const cSlot = useSelector((state) => state.tabList.tabList[props.id].cSkill);
  const sSlot = useSelector((state) => state.tabList.tabList[props.id].sSkill);

  // support info
  const SummonerSupport = useSelector((state) => state.tabList.tabList[props.id].summonerSupport);
  const AllySupport = useSelector((state) => state.tabList.tabList[props.id].allySupport);

  // assets flaws and ascended stats info
  const levels = useSelector((state) => state.tabList.tabList[props.id].levels);
  const superboon = useSelector((state) => state.tabList.tabList[props.id].hero.superboon);
  const superbane = useSelector((state) => state.tabList.tabList[props.id].hero.superbane);
  const asset = useSelector((state) => state.tabList.tabList[props.id].asset);
  const flaw = useSelector((state) => state.tabList.tabList[props.id].flaw);
  const ascended = useSelector((state) => state.tabList.tabList[props.id].ascended);

  // truthy values for resplendent and resplendent stat toggle buttons
  const resplendent = useSelector((state) => state.tabList.tabList[props.id].resplendent);
  const resplendentStats = useSelector((state) => state.tabList.tabList[props.id].resplendentStats);

  // for beast units only
  const transformed = useSelector((state) => state.tabList.tabList[props.id].transformed);

  // length check on barracks for disabled state of save button
  const barracksLength = useSelector((state) => state.barracks.key);

  // loading variable to ensure that no state skill changes are committed while loading a new hero
  const [isLoading, setIsLoading] = useState([true, true, true, true, true]);
  const [disabledButton, setDisabledButton] = useState(true);
  const [tempWeapon, setTempWeapon] = useState("");

  // for load modal
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

  async function heroChange(newHero) {
    setIsLoading([true, true, true, true, true]);
    setDisabledButton(true);
    dispatch(actions.resetTab(props.id));
    let response = await fetch("http://localhost:5000/Heroes/" + newHero);
    response = await response.json();

    //get all possible skills on call? Instead of in multiple calls in children?
    response[0]["exists"] = true;
    response[0].artist = response[0].Artist.split(",");
    response[0].VA = response[0].EVA;
    response[0].character_id = newHero;
    dispatch(actions.changeHero(response[0], props.id));

    dispatch(actions.changeLevels([1, 1, 1, 1, 1], props.id));
  }

  async function loadBuild(build) {
    setIsLoading([true, true, true, true, true]);
    setDisabledButton(true);

    // resets the tab to accomodate a different build
    dispatch(actions.resetTab(props.id));
    var buildFromBarracks = {};
    Object.assign(buildFromBarracks, build);

    // gets the hero from the db to check if there have been any changes (like skills)
    let response = await fetch("http://localhost:5000/Heroes/" + buildFromBarracks.value);
    response = await response.json();

    // sets the gotten character as the builds hero
    console.log(buildFromBarracks.weapon);
    response[0]["exists"] = true;
    response[0].artist = response[0].Artist.split(",");
    response[0].VA = response[0].EVA;
    setTempWeapon(buildFromBarracks.weapon);
    buildFromBarracks.weapon = "";
    buildFromBarracks.hero = response[0];

    // load the hero and build into the current tab
    dispatch(actions.loadBuildFromBarracks(buildFromBarracks, props.id));
  }

  useEffect(() => {
    // wait for the
    if (tempWeapon !== "" && !isLoading[0]) {
      dispatch(actions.changeWeapon(tempWeapon, props.id));
      setTempWeapon("");
    }
  }, [isLoading[0]]);

  useEffect(() => {
    dispatch(actions.changeStats(props.id));
  }, [hero, hp, atk, spd, def, res]);

  const checkLoading = (index) => {
    var temp = isLoading;
    temp[index] = false;
    setIsLoading(temp);
    if (!isLoading.includes(true)) {
      setDisabledButton(false);
    }
  };
  useEffect(() => {}, [disabledButton]);

  // button features
  const maximize = () => {
    mergeChange(10);
    var index = +hero.dragonflowers;
    flowerChange(index);
  };

  const skills = () => {
    // must find a way to have the program take a fuckin chill pill when clicked before the hero is properly loaded in
    // load in the top skills to the specified skill slots.
    if (weapon.name !== hero.weapons[hero.weapons.length - 1]) {
      dispatch(actions.changeWeapon(hero.weapons[hero.weapons.length - 1], props.id));
    }

    if (hero.assists[0] !== "" && hero.assists[0] !== undefined && assist.name !== hero.assists[hero.assists.length - 1]) {
      dispatch(actions.changeAssist(hero.assists[hero.assists.length - 1], props.id));
    }
    if (hero.specials[0] !== "" && hero.specials[0] !== undefined && special.name !== hero.specials[hero.specials.length - 1]) {
      dispatch(actions.changeSpecial(hero.specials[hero.specials.length - 1], props.id));
    }
    if (hero.a[0] !== "" && hero.a[0] !== undefined && aSlot.name !== hero.a[hero.a.length - 1]) {
      dispatch(actions.changeASlot(hero.a[hero.a.length - 1], props.id));
    }
    if (hero.b[0] !== "" && hero.b[0] !== undefined && bSlot.name !== hero.b[hero.b.length - 1]) {
      dispatch(actions.changeBSlot(hero.b[hero.b.length - 1], props.id));
    }
    if (hero.c[0] !== "" && hero.c[0] !== undefined && cSlot.name !== hero.c[hero.c.length - 1]) {
      dispatch(actions.changeCSlot(hero.c[hero.c.length - 1], props.id));
    }
  };

  const mergeChange = (number) => {
    var tempArray = [];
    var mergeTemp = [];

    tempArray.push(0);
    tempArray.push(parseInt(hero.atk[levels[1]]));
    tempArray.push(parseInt(hero.spd[levels[2]]));
    tempArray.push(parseInt(hero.def[levels[3]]));
    tempArray.push(parseInt(hero.res[levels[4]]));

    mergeTemp.push(0);
    var i = 0;
    while (i < 4) {
      var index = tempArray.indexOf(Math.max(...tempArray));
      mergeTemp.push(index);
      tempArray[index] = 0;
      i += 1;
    }
    dispatch(actions.changeMerges(number, mergeTemp, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const flowerChange = (value) => {
    dispatch(actions.changeDragonflowers(value, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const assetChange = (array, a) => {
    dispatch(actions.changeLevels(array, props.id, a, flaw, ascended));
    dispatch(actions.changeStats(props.id));
  };

  const flawChange = (array, f) => {
    dispatch(actions.changeLevels(array, props.id, asset, f, ascended));
    dispatch(actions.changeStats(props.id));
  };

  const ascendedChange = (array, a) => {
    dispatch(actions.changeLevels(array, props.id, asset, flaw, a));
    dispatch(actions.changeStats(props.id));
  };

  const changeWeapon = (w) => {
    dispatch(actions.changeWeapon(w, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const changeRefine = (r) => {
    dispatch(actions.changeRefine(r, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const changeAssist = (a) => {
    dispatch(actions.changeAssist(a, props.id));
  };

  const changeSpecial = (s) => {
    dispatch(actions.changeSpecial(s, props.id));
  };

  const changeASkill = (a) => {
    dispatch(actions.changeASlot(a, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const changeBSkill = (b) => {
    dispatch(actions.changeBSlot(b, props.id));
  };

  const changeCSkill = (c) => {
    dispatch(actions.changeCSlot(c, props.id));
  };

  const changeSSkill = (s) => {
    dispatch(actions.changeSSlot(s, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const changeBlessing = (b) => {
    dispatch(actions.changeBlessing(b, props.id));
  };

  const changeBlessingStats = (buffs, heroes) => {
    dispatch(actions.changeBlessingStats(buffs, heroes, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const changeSummonerSupport = (event) => {
    dispatch(actions.changeSS(event, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const changeAllySupport = (event) => {
    dispatch(actions.changeAS(event, props.id));
  };

  const handleTransform = (event) => {
    dispatch(actions.changeTransformed(event, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const changeBackground = (bg) => {
    dispatch(actions.changeBackground(bg, props.id));
  };

  const changeFavorite = (fav) => {
    dispatch(actions.changeFavorite(fav, props.id));
  };

  const changeResplendent = (r) => {
    dispatch(actions.changeResplendent(r, props.id));
  };

  const handleResplendentStats = (r) => {
    dispatch(actions.changeResplendentStats(r, props.id));
    dispatch(actions.changeStats(props.id));
  };

  return (
    <div>
      <Container className="noMargin" style={{ height: "100%" }}>
        <Row style={{ marginTop: "5px" }}>
          <div className="inline-row">
            <Button variant="contained" color="primary" style={{ marginRight: "5px" }} onClick={handleShowLoad}>
              Load
            </Button>
            <Tooltip title="Barracks are full!" placement="top" disableHoverListener={barracksLength !== 12}>
              <div>
                <Button variant="contained" color="primary" disabled={!hero.exists || barracksLength === 12} onClick={handleShowSave}>
                  Save
                </Button>
              </div>
            </Tooltip>
            <SaveBuildModal show={showSave} onClose={handleCloseSave} tab={tab} />
            <BarracksModal show={showLoad} onClose={handleCloseLoad} loadBuild={loadBuild} id={props.id} />
          </div>
        </Row>
        <Row>
          <Col md={5} style={{ marginTop: "-2%" }}>
            <Row style={{ justifyContent: "space-between" }}>
              <div className="header-row">
                <div className="headers">Stats:</div>
                <Button variant="contained" color="primary" style={{ width: "20%", height: "60%" }} disabled={!hero.exists} onClick={maximize}>
                  Maximize
                </Button>
              </div>
            </Row>
            <Row>
              <Col>
                <Dropdown onChange={heroChange} title={"Select Hero"} id={props.id} />
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Merges hero={hero} levels={levels} onChange={mergeChange} placeholder={"Merges"} id={props.id} />
              </Col>
              <Col>
                <FlowerComponent hero={hero} onChange={flowerChange} id={props.id} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Traits
                  hero={hero}
                  stat={asset}
                  stats={superboon}
                  array={levels}
                  color={"#79ba8e"}
                  label={"+"}
                  onChange={assetChange}
                  placeholder={"Asset"}
                />
              </Col>
              <Col>
                <Traits
                  hero={hero}
                  stat={flaw}
                  stats={superbane}
                  array={levels}
                  color={"#e68585"}
                  label={"-"}
                  onChange={flawChange}
                  placeholder={"Flaw"}
                />
              </Col>
              <Col>
                <Traits
                  hero={hero}
                  stat={ascended}
                  stats={superboon}
                  array={levels}
                  color={"#79ba8e"}
                  label={"+"}
                  onChange={ascendedChange}
                  placeholder={"Ascended"}
                />
              </Col>
            </Row>
            <Row style={{ justifyContent: "space-between" }}>
              <div className="header-row">
                <div className="headers">Skills:</div>
                <Button variant="contained" color="primary" style={{ width: "15%", height: "60%" }} disabled={disabledButton} onClick={skills}>
                  Skills
                </Button>
              </div>
            </Row>
            <WeaponComponent hero={hero} onChangeW={changeWeapon} onChangeR={changeRefine} id={props.id} />
            <SkillComponent
              hero={hero}
              skill={assist}
              heroSkills={hero.assists}
              id={props.id}
              onChange={changeAssist}
              onLoad={checkLoading}
              url={`http://localhost:5000/Assist/`}
              placeholder={"Choose Assist"}
            />
            <SkillComponent
              hero={hero}
              skill={special}
              heroSkills={hero.specials}
              id={props.id}
              onChange={changeSpecial}
              onLoad={checkLoading}
              url={`http://localhost:5000/Specials/`}
              placeholder={"Choose Special"}
            />
            <SkillComponent
              hero={hero}
              skill={aSlot}
              heroSkills={hero.a}
              id={props.id}
              onChange={changeASkill}
              onLoad={checkLoading}
              url={`http://localhost:5000/A_Slot/`}
              placeholder={"Choose A Skill"}
            />
            <SkillComponent
              hero={hero}
              skill={bSlot}
              heroSkills={hero.b}
              id={props.id}
              onChange={changeBSkill}
              onLoad={checkLoading}
              url={`http://localhost:5000/B_Slot/`}
              placeholder={"Choose B Skill"}
            />
            <SkillComponent
              hero={hero}
              skill={cSlot}
              heroSkills={hero.c}
              id={props.id}
              onChange={changeCSkill}
              onLoad={checkLoading}
              url={`http://localhost:5000/C_Slot/`}
              placeholder={"Choose C Skill"}
            />
            {/* <SkillComponent
              hero={hero}
              skill={sSlot}
              id={props.id}
              onChange={changeSSkill}
              url={`http://localhost:5000/S_Slot/`}
              placeholder={"Choose S Skill"}
            /> */}
          </Col>
          <Col md={4} style={{ marginTop: "15px", textAlign: "right" }}>
            <h5>Additional:</h5>
            <BlessingComponent hero={hero} placeholder={"Blessing"} onChange={changeBlessing} id={props.id} />
            <div style={{ marginTop: "5px", height: "150px" }}>
              <BlessingHeroSelectionComponent hero={hero} onChange={changeBlessingStats} id={props.id} />
            </div>
            buffs or debuffs stats
          </Col>
          <Col style={{ marginTop: "5px", textAlign: "right" }}>
            <Row style={{ marginTop: "35px" }}>
              <ToggleComponent currentState={SummonerSupport} exists={hero.exists} label={"Summoner Support:"} onChange={changeSummonerSupport} />
            </Row>
            <ToggleComponent currentState={AllySupport} exists={hero.exists} label={"Ally Support:"} onChange={changeAllySupport} />
            <SwitchComponent
              res={transformed === 2}
              enabled={hero.weapon_type.includes("Beast") || hero.weapon_type.includes("Dragon")}
              onChange={handleTransform}
              label={"Transformed?"}
            />
            <SwitchComponent res={resplendent} enabled={hero.artist[1]} onChange={changeResplendent} label={"Resplendant Art"} />
            <SwitchComponent res={resplendentStats} enabled={hero.name !== ""} onChange={handleResplendentStats} label={"Resplendant Stats"} />
            <Row style={{ width: "85%", display: "inline-flex", justifyContent: "right" }}>
              <BackgroundDropdown hero={hero} placeholder={"Background"} onChange={changeBackground} id={props.id} />
            </Row>
            <Row style={{ width: "85%", display: "inline-flex", justifyContent: "right" }}>
              <FavoriteComponent hero={hero} placeholder={"Favorite"} onChange={changeFavorite} id={props.id} />
            </Row>
          </Col>
        </Row>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            width: "100%",
            display: "inline-flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <img src={left} alt="left arrow" style={{ width: "30%", height: "20px" }} />
          <div style={{ fontSize: "20px", fontStyle: "italic" }}>Additional Information</div>
          <img src={right} alt="right arrow" style={{ width: "30%", height: "20px" }} />
        </div>
        <div style={{ width: "100%", display: "inline-flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <Button variant="contained">UI Changes</Button>
          <Button variant="contained" disabled={!hero.exists}>
            Recommended Builds
          </Button>
          <Button variant="contained" onClick={handleShowHeroInfo} disabled={!hero.exists}>
            Hero info
          </Button>
          <HeroInfoModal show={showHeroInfo} onClose={handleCloseHeroInfo} hero={hero} />
        </div>
      </Container>
    </div>
  );
}
