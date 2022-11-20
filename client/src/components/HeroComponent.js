import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
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

//redux imports
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions";

export default function HeroComponent(props) {
  const dispatch = useDispatch();
  const hero = useSelector((state) => state.tabList.tabList[props.id].hero);
  const hp = useSelector((state) => state.tabList.tabList[props.id].hero.hp);
  const atk = useSelector((state) => state.tabList.tabList[props.id].hero.atk);
  const spd = useSelector((state) => state.tabList.tabList[props.id].hero.spd);
  const def = useSelector((state) => state.tabList.tabList[props.id].hero.def);
  const res = useSelector((state) => state.tabList.tabList[props.id].hero.res);

  // assets flaws and ascended stats info
  const levels = useSelector((state) => state.tabList.tabList[props.id].levels);
  const superboon = useSelector((state) => state.tabList.tabList[props.id].superboon);
  const superbane = useSelector((state) => state.tabList.tabList[props.id].superbane);

  // truthy values for resplendent and resplendent stat toggle buttons
  const resplendent = useSelector((state) => state.tabList.tabList[props.id].resplendent);
  const resplendentStats = useSelector((state) => state.tabList.tabList[props.id].resplendentStats);

  // for beast units only
  const [transformed, setTransformed] = useState(false);
  const [transformedStats, setTransformedStats] = useState(0);

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

    // setTransformed(false);
    // props.changeTransformed(false);

    dispatch(actions.changeLevels([1, 1, 1, 1, 1], props.id));
  }

  useEffect(() => {
    dispatch(actions.changeStats(props.id));
  }, [hero, hp, atk, spd, def, res]);

  const mergeChange = (number, order) => {
    dispatch(actions.changeMerges(number, order, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const flowerChange = (value, array) => {
    dispatch(actions.changeDragonflowers(value, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const assetChange = (array, asset) => {
    dispatch(actions.changeLevels(array, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const flawChange = (array, flaw) => {
    dispatch(actions.changeLevels(array, props.id));
    dispatch(actions.changeStats(props.id));
  };

  const ascendedChange = (array, ascended) => {
    dispatch(actions.changeLevels(array, props.id));
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
    dispatch(actions.changeBlessing(b.value, props.id));
  };

  const changeBlessingStats = (buffs) => {
    dispatch(actions.changeBlessingStats(buffs, props.id));
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
    setTransformed(event);
    if (event && hero.weapon_type.includes("Beast")) {
      setTransformedStats(2);
    } else {
      setTransformedStats(0);
    }
    // props.changeTransformed(event);
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
                <Dropdown onChange={heroChange} url={"http://localhost:5000/Heroes/"} title={"Select Hero"} hero={hero} id={props.id} />
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
              <Col style={{ padding: "2px", margin: "10px" }}>
                <Traits hero={hero} stats={superboon} array={levels} color={"#79ba8e"} label={"+"} onChange={assetChange} placeholder={"Asset"} />
              </Col>
              <Col style={{ padding: "2px", margin: "10px" }}>
                <Traits hero={hero} stats={superbane} array={levels} color={"#e68585"} label={"-"} onChange={flawChange} placeholder={"Flaw"} />
              </Col>{" "}
              <Col style={{ padding: "2px", margin: "10px" }}>
                <Traits
                  hero={hero}
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
            <WeaponComponent hero={hero} onChangeW={changeWeapon} onChangeR={changeRefine} />
            <SkillComponent hero={hero} id={props.id} onChange={changeAssist} url={`http://localhost:5000/Assist/`} placeholder={"Choose Assist"} />
            <SkillComponent
              hero={hero}
              id={props.id}
              onChange={changeSpecial}
              url={`http://localhost:5000/Specials/`}
              placeholder={"Choose Special"}
            />
            <SkillComponent hero={hero} id={props.id} onChange={changeASkill} url={`http://localhost:5000/A_Slot/`} placeholder={"Choose A Skill"} />
            <SkillComponent hero={hero} id={props.id} onChange={changeBSkill} url={`http://localhost:5000/B_Slot/`} placeholder={"Choose B Skill"} />
            <SkillComponent hero={hero} id={props.id} onChange={changeCSkill} url={`http://localhost:5000/C_Slot/`} placeholder={"Choose C Skill"} />
            <SkillComponent hero={hero} id={props.id} onChange={changeSSkill} url={`http://localhost:5000/S_Slot/`} placeholder={"Choose S Skill"} />
          </Col>
          <Col md={3} style={{ marginTop: "10px", textAlign: "right" }}>
            <h5 style={{ marginTop: "10px" }}>Additional:</h5>
            <BlessingComponent hero={hero} placeholder={"Blessing"} onChange={changeBlessing} id={props.id} />
            <SwitchComponent
              res={transformed}
              enabled={hero.weapon_type.includes("Beast") || hero.weapon_type.includes("Dragon")}
              onChange={handleTransform}
              label={"Transformed?"}
            />
            <SwitchComponent res={resplendent} enabled={hero.artist[1]} onChange={changeResplendent} label={"Resplendant Art"} />
            <SwitchComponent res={resplendentStats} enabled={hero.name !== ""} onChange={handleResplendentStats} label={"Resplendant Stats"} />
            <ToggleComponent exists={hero.exists} label={"Summoner Support:"} onChange={changeSummonerSupport} />
            <ToggleComponent exists={hero.exists} label={"Ally Support:"} onChange={changeAllySupport} />
            <BackgroundDropdown hero={hero} placeholder={"Background"} onChange={changeBackground} />
            <FavoriteComponent hero={hero} placeholder={"Favorite"} onChange={changeFavorite} />
          </Col>
          <Col>
            buffs or debuffs stats
            <BlessingHeroSelectionComponent hero={hero} onChange={changeBlessingStats} id={props.id} />
          </Col>
        </Row>
        <Row style={{ marginTop: "5%" }}>
          <Col> put whole vs battle ui vs echoes here, also put recommended builds or bookmarks here</Col>
        </Row>
      </Container>
    </div>
  );
}
