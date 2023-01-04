import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
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

//redux imports
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions";

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

  // for load modal
  const [showLoad, setShowLoad] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const handleShowLoad = () => setShowLoad(true);
  const handleCloseLoad = () => setShowLoad(false);
  const handleShowSave = () => setShowSave(true);
  const handleCloseSave = () => setShowSave(false);

  async function heroChange(newHero) {
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

  useEffect(() => {
    dispatch(actions.changeStats(props.id));
  }, [hero, hp, atk, spd, def, res]);

  // button features
  const maximize = () => {
    mergeChange(10);
    var index = +hero.dragonflowers;
    flowerChange(index);
  };

  async function skills() {
    // load in the top skills to the specified skill slots.
    let response = await fetch(`http://localhost:5000/Loadout/` + hero._id);
    response = await response.json();
    console.log(response);
    // dispatch(actions.changeWeapon(response[0], props.id));
    // dispatch(actions.changeStats(props.id));
  }

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
    console.log(r);
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
    dispatch(actions.changeBlessing(b.value, props.id));
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
        <Row>
          <Col md={5}>
            <h3>Stats:</h3>
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
            <h3>Skills:</h3>
            <WeaponComponent hero={hero} onChangeW={changeWeapon} onChangeR={changeRefine} id={props.id} />
            <SkillComponent
              hero={hero}
              skill={assist}
              heroSkills={hero.assists}
              id={props.id}
              onChange={changeAssist}
              url={`http://localhost:5000/Assist/`}
              placeholder={"Choose Assist"}
            />
            <SkillComponent
              hero={hero}
              skill={special}
              heroSkills={hero.specials}
              id={props.id}
              onChange={changeSpecial}
              url={`http://localhost:5000/Specials/`}
              placeholder={"Choose Special"}
            />
            <SkillComponent
              hero={hero}
              skill={aSlot}
              heroSkills={hero.a}
              id={props.id}
              onChange={changeASkill}
              url={`http://localhost:5000/A_Slot/`}
              placeholder={"Choose A Skill"}
            />
            <SkillComponent
              hero={hero}
              skill={bSlot}
              heroSkills={hero.b}
              id={props.id}
              onChange={changeBSkill}
              url={`http://localhost:5000/B_Slot/`}
              placeholder={"Choose B Skill"}
            />
            <SkillComponent
              hero={hero}
              skill={cSlot}
              heroSkills={hero.c}
              id={props.id}
              onChange={changeCSkill}
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
          <Col md={4} style={{ marginTop: "30px", textAlign: "right" }}>
            <h5 style={{ marginTop: "10px" }}>Additional:</h5>
            <BlessingComponent hero={hero} placeholder={"Blessing"} onChange={changeBlessing} id={props.id} />
            <BlessingHeroSelectionComponent hero={hero} onChange={changeBlessingStats} id={props.id} />
            <ToggleComponent currentState={SummonerSupport} exists={hero.exists} label={"Summoner Support:"} onChange={changeSummonerSupport} />
            <ToggleComponent currentState={AllySupport} exists={hero.exists} label={"Ally Support:"} onChange={changeAllySupport} />
          </Col>
          <Col style={{ marginTop: "5px", textAlign: "right" }}>
            <Row style={{ justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" style={{ width: "48%" }} disabled={!hero.exists} onClick={handleShowSave}>
                Save
              </Button>
              <SaveBuildModal show={showSave} onClose={handleCloseSave} tab={tab} />
              <Button variant="contained" color="primary" style={{ width: "48%" }} onClick={handleShowLoad}>
                Load
              </Button>
              <BarracksModal show={showLoad} onClose={handleCloseLoad} id={props.id} />
            </Row>
            <Row style={{ justifyContent: "space-between", marginTop: "5px" }}>
              <Button variant="contained" color="primary" style={{ width: "48%" }} disabled={!hero.exists} onClick={maximize}>
                Maximize
              </Button>
              <Button variant="contained" color="primary" style={{ width: "48%" }} disabled={!hero.exists} onClick={skills}>
                Skills
              </Button>
            </Row>
            buffs or debuffs stats
            <SwitchComponent
              res={transformed === 2}
              enabled={hero.weapon_type.includes("Beast") || hero.weapon_type.includes("Dragon")}
              onChange={handleTransform}
              label={"Transformed?"}
            />
            <SwitchComponent res={resplendent} enabled={hero.artist[1]} onChange={changeResplendent} label={"Resplendant Art"} />
            <SwitchComponent res={resplendentStats} enabled={hero.name !== ""} onChange={handleResplendentStats} label={"Resplendant Stats"} />
            <BackgroundDropdown hero={hero} placeholder={"Background"} onChange={changeBackground} id={props.id} />
            <FavoriteComponent hero={hero} placeholder={"Favorite"} onChange={changeFavorite} id={props.id} />
          </Col>
        </Row>
        <Row style={{ marginTop: "5%" }}>
          <Col> put whole vs battle ui vs echoes here, also put recommended builds or bookmarks here</Col>
        </Row>
      </Container>
    </div>
  );
}
