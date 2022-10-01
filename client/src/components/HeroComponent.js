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

export default function HeroComponent(props) {
  const [hero, setHero] = useState({
    name: "",
    single_name: "",
    title: "",
    hp: [],
    atk: [],
    spd: [],
    def: [],
    res: [],
    weapons: [],
    assists: [],
    specials: [],
    passives: [],
    weapon_type: "",
    move_type: "",
    hero_type: "",
    eVA: "",
    Artist: ",",
    dragonflowers: 0,
    exists: false,
  });

  const [stats, setStats] = useState(["", "", "", "", ""]);

  const [skills, setSkills] = useState({
    weapon: {
      name: "",
      might: 0,
      visibleStats: [0, 0, 0, 0, 0],
      refine: false,
    },
    refine: {
      name: "",
      description: "",
      stats: [0, 0, 0, 0, 0],
      img: "",
    },
    assist: {
      name: "",
      img: null,
      visibleStats: [0, 0, 0, 0, 0],
      unique: false,
    },
    special: {
      name: "",
      img: null,
      visibleStats: [0, 0, 0, 0, 0],
      unique: false,
    },
    aSkill: {
      name: "",
      img: null,
      visibleStats: [0, 0, 0, 0, 0],
      unique: false,
    },
    bSkill: {
      name: "",
      img: null,
      visibleStats: [0, 0, 0, 0, 0],
      unique: false,
    },
    cSkill: {
      name: "",
      img: null,
      visibleStats: [0, 0, 0, 0, 0],
      unique: false,
    },
    sSkill: {
      name: "",
      img: null,
      visibleStats: [0, 0, 0, 0, 0],
      unique: false,
    },
  });

  const [levels, setLevels] = useState({
    array: [1, 1, 1, 1, 1], // levels for assets and flaws
    disabled: false,
    superboon: [],
    superbane: [],
  });

  // this is for skipping the level 1 stats
  const [heroLevel] = useState(3);
  const [merges, setMerges] = useState(0);
  const [mergeOrder, setMergeOrder] = useState([]);
  const [mergedStats, setMergedStats] = useState([0, 0, 0, 0, 0]);
  const [prevFlaw, setPrevFlaw] = useState("");
  const [prevAsset, setPrevAsset] = useState("");
  const [prevAscended, setPrevAscended] = useState("");
  const [flowerStats, setFlowerStats] = useState([0, 0, 0, 0, 0]);

  // blessing variables
  const [blessing, setBlessing] = useState("");
  const [heroBuffStats, setHeroBuffStats] = useState([0, 0, 0, 0, 0]);
  const [resplendent, setResplendent] = useState(false);
  const [resplendentStatsBoolean, setResplendentStatsBoolean] = useState(false);
  const [resplendentStats, setResplendentStats] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    // call calculate stats here
    addStats();

    var newObject = {
      name: hero.name,
      singleName: hero.single_name,
      title: hero.title,
      VA: hero.EVA,
      artist: hero.Artist.split(","),
      moveType: hero.move_type,
      weaponType: hero.weapon_type,
      hero_type: hero.hero_type,
    };
    props.changeHero(newObject);

    // set the resplendent to be false for any switch in hero
    setResplendent(false);
    props.changeResplendent(false);

    setFlowerStats([0, 0, 0, 0, 0]);
    setMergedStats([0, 0, 0, 0, 0]);
    setHeroBuffStats([0, 0, 0, 0, 0]);
    setBlessing("");
  }, [hero]);

  useEffect(() => {
    addStats();
    props.changeSkills(skills);
  }, [skills]);

  useEffect(() => {
    if (merges !== 0) {
      calculateMergeStats();
    } else {
      setMergedStats([0, 0, 0, 0, 0]);
    }
  }, [merges]);

  useEffect(() => {
    addStats();
  }, [mergedStats]);

  useEffect(() => {
    calculateMergeStats();
    addStats();
  }, [flowerStats, heroBuffStats, prevFlaw, prevAsset, prevAscended]);

  useEffect(() => {
    props.changeBlessing(blessing);
  }, [blessing]);

  useEffect(() => {
    addStats();
  }, [resplendentStats]);

  useEffect(() => {
    props.changeResplendent(resplendent);
  }, [resplendent]);

  useEffect(() => {
    props.changeStats(stats, merges, levels.array);
  }, [stats]);

  const heroChange = (newHero) => {
    //get all possible skills on call? Instead of in multiple calls in children?
    newHero.value.exists = true;
    setHero(newHero.value);

    setLevels({
      ...levels,
      superboon: newHero.value.superboon,
      superbane: newHero.value.superbane,
    });

    setSkills({
      weapon: {
        name: "",
        might: 0,
        visibleStats: [0, 0, 0, 0, 0],
        refine: false,
      },
      refine: {
        name: "",
        description: "",
        stats: [0, 0, 0, 0, 0],
        img: "",
      },
      assist: {
        name: "",
        img: null,
        visibleStats: [0, 0, 0, 0, 0],
        unique: false,
      },
      special: {
        name: "",
        img: null,
        visibleStats: [0, 0, 0, 0, 0],
        unique: false,
      },
      aSkill: {
        name: "",
        img: null,
        visibleStats: [0, 0, 0, 0, 0],
        unique: false,
      },
      bSkill: {
        name: "",
        img: null,
        visibleStats: [0, 0, 0, 0, 0],
        unique: false,
      },
      cSkill: {
        name: "",
        img: null,
        visibleStats: [0, 0, 0, 0, 0],
        unique: false,
      },
      sSkill: {
        name: "",
        img: null,
        visibleStats: [0, 0, 0, 0, 0],
        unique: false,
      },
    });
  };

  const calculateMergeStats = () => {
    var tempArray = [0, 0, 0, 0, 0];

    if (merges === 10) {
      tempArray[mergeOrder[4]] = tempArray[mergeOrder[4]] + 1;
      tempArray[mergeOrder[3]] = tempArray[mergeOrder[3]] + 1;
    }
    if (merges >= 9) {
      tempArray[mergeOrder[1]] = tempArray[mergeOrder[1]] + 1;
      tempArray[mergeOrder[2]] = tempArray[mergeOrder[2]] + 1;
    }
    if (merges >= 8) {
      tempArray[mergeOrder[4]] = tempArray[mergeOrder[4]] + 1;
      tempArray[mergeOrder[0]] = tempArray[mergeOrder[0]] + 1;
    }
    if (merges >= 7) {
      tempArray[mergeOrder[2]] = tempArray[mergeOrder[2]] + 1;
      tempArray[mergeOrder[3]] = tempArray[mergeOrder[3]] + 1;
    }
    if (merges >= 6) {
      tempArray[mergeOrder[1]] = tempArray[mergeOrder[1]] + 1;
      tempArray[mergeOrder[0]] = tempArray[mergeOrder[0]] + 1;
    }
    if (merges >= 5) {
      tempArray[mergeOrder[4]] = tempArray[mergeOrder[4]] + 1;
      tempArray[mergeOrder[3]] = tempArray[mergeOrder[3]] + 1;
    }
    if (merges >= 4) {
      tempArray[mergeOrder[1]] = tempArray[mergeOrder[1]] + 1;
      tempArray[mergeOrder[2]] = tempArray[mergeOrder[2]] + 1;
    }
    if (merges >= 3) {
      tempArray[mergeOrder[4]] = tempArray[mergeOrder[4]] + 1;
      tempArray[mergeOrder[0]] = tempArray[mergeOrder[0]] + 1;
    }
    if (merges >= 2) {
      tempArray[mergeOrder[2]] = tempArray[mergeOrder[2]] + 1;
      tempArray[mergeOrder[3]] = tempArray[mergeOrder[3]] + 1;
    }
    if (merges >= 1) {
      if (prevFlaw === "" && prevAsset === "") {
        tempArray[mergeOrder[0]] = tempArray[mergeOrder[0]] + 2;
        tempArray[mergeOrder[1]] = tempArray[mergeOrder[1]] + 2;
        tempArray[mergeOrder[2]] = tempArray[mergeOrder[2]] + 1;
      } else {
        tempArray[mergeOrder[0]] = tempArray[mergeOrder[0]] + 1;
        tempArray[mergeOrder[1]] = tempArray[mergeOrder[1]] + 1;

        if (prevFlaw !== "") {
          var levelArray = levels.array;
          if (prevFlaw === "hp") {
            levelArray[0] = 1;
          }
          if (prevFlaw === "atk") {
            levelArray[1] = 1;
          }
          if (prevFlaw === "spd") {
            levelArray[2] = 1;
          }
          if (prevFlaw === "def") {
            levelArray[3] = 1;
          }
          if (prevFlaw === "res") {
            levelArray[4] = 1;
          }
          setLevels({ ...levels, array: levelArray, disabled: true });
        }
      }
    }
    if (merges === 0) {
      setLevels({ ...levels, disabled: false });
    }
    setMergedStats(tempArray);
  };

  const addStats = () => {
    var tempArray = [0, 0, 0, 0, 0];
    tempArray[0] =
      parseInt(hero.hp[heroLevel + levels.array[0]]) +
      parseInt(mergedStats[0]) +
      parseInt(flowerStats[0]) +
      parseInt(heroBuffStats[0]) +
      parseInt(skills.weapon.visibleStats[0]) +
      parseInt(skills.refine.stats[0]) +
      parseInt(skills.aSkill.visibleStats[0]) +
      parseInt(resplendentStats[0]);
    tempArray[1] =
      parseInt(hero.atk[heroLevel + levels.array[1]]) +
      parseInt(mergedStats[1]) +
      parseInt(flowerStats[1]) +
      parseInt(heroBuffStats[1]) +
      parseInt(skills.weapon.might) +
      parseInt(skills.weapon.visibleStats[1]) +
      parseInt(skills.refine.stats[1]) +
      parseInt(skills.aSkill.visibleStats[1]) +
      parseInt(resplendentStats[1]);
    tempArray[2] =
      parseInt(hero.spd[heroLevel + levels.array[2]]) +
      parseInt(mergedStats[2]) +
      parseInt(flowerStats[2]) +
      parseInt(heroBuffStats[2]) +
      parseInt(skills.weapon.visibleStats[2]) +
      parseInt(skills.refine.stats[2]) +
      parseInt(skills.aSkill.visibleStats[2]) +
      parseInt(resplendentStats[2]);
    tempArray[3] =
      parseInt(hero.def[heroLevel + levels.array[3]]) +
      parseInt(mergedStats[3]) +
      parseInt(flowerStats[3]) +
      parseInt(heroBuffStats[3]) +
      parseInt(skills.weapon.visibleStats[3]) +
      parseInt(skills.refine.stats[3]) +
      parseInt(skills.aSkill.visibleStats[3]) +
      parseInt(resplendentStats[3]);
    tempArray[4] =
      parseInt(hero.res[heroLevel + levels.array[4]]) +
      parseInt(mergedStats[4]) +
      parseInt(flowerStats[4]) +
      parseInt(heroBuffStats[4]) +
      parseInt(skills.weapon.visibleStats[4]) +
      parseInt(skills.refine.stats[4]) +
      parseInt(skills.aSkill.visibleStats[4]) +
      parseInt(resplendentStats[4]);

    if (isNaN(tempArray[0])) {
      setStats(["", "", "", "", ""]);
    } else {
      setStats(tempArray);
    }
  };

  const mergeChange = (number, order) => {
    setMerges(number);
    setMergeOrder(order);
    calculateMergeStats();
  };

  const flowerChange = (array) => {
    setFlowerStats(array);
  };

  const assetChange = (array, asset) => {
    setLevels({ ...levels, array: array });
    setPrevAsset(asset);
    setMergedStats([0, 0, 0, 0, 0]);
  };

  const flawChange = (array, flaw) => {
    setLevels({ ...levels, array: array });
    setPrevFlaw(flaw);
    setMergedStats([0, 0, 0, 0, 0]);
  };

  const ascendedChange = (array, ascended) => {
    setLevels({ ...levels, array: array });
    setPrevAscended(ascended);
    setMergedStats([0, 0, 0, 0, 0]);
  };

  const changeWeapon = (w) => {
    setSkills({ ...skills, weapon: w.value });
  };

  const changeRefine = (r) => {
    setSkills({ ...skills, refine: r.value });
  };

  const changeAssist = (a) => {
    setSkills({ ...skills, assist: a.value });
  };

  const changeSpecial = (s) => {
    setSkills({ ...skills, special: s.value });
  };

  const changeASkill = (a) => {
    setSkills({ ...skills, aSkill: a.value });
  };

  const changeBSkill = (b) => {
    setSkills({ ...skills, bSkill: b.value });
  };

  const changeCSkill = (c) => {
    setSkills({ ...skills, cSkill: c.value });
  };

  const changeSSkill = (s) => {
    setSkills({ ...skills, sSkill: s.value });
  };

  const changeBlessing = (b) => {
    setBlessing(b.value);
  };

  const changeBlessingStats = (buffs) => {
    setHeroBuffStats(buffs);
    // not really sure why this is necessary, but the use effect is not triggering appropriately
    addStats();
  };

  const handleResplendent = (res) => {
    setResplendent(res);
  };

  const handleResplendentStats = (r) => {
    if (r) {
      setResplendentStatsBoolean(true);
      setResplendentStats([2, 2, 2, 2, 2]);
    } else {
      setResplendentStatsBoolean(false);
      setResplendentStats([0, 0, 0, 0, 0]);
    }
  };

  return (
    <div>
      <Container className="noMargin">
        <Row>
          <Col style={{ margin: "5px" }}>
            <h3 style={{ marginLeft: "-8px" }}>Base Stats:</h3>
            <Row>
              <label
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "16px",
                }}
              >
                Hero List:
              </label>
              <Col style={{ padding: "2px" }}>
                <Dropdown
                  onChange={heroChange}
                  url={"http://localhost:5000/Heroes/"}
                  title={"Select Hero"}
                  hero={hero}
                />
              </Col>
            </Row>
            <Row>
              <label
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "16px",
                }}
              >
                {" "}
                Merges/Dragonflowers:{" "}
              </label>
              <Col style={{ padding: "2px" }}>
                <Merges hero={hero} levels={levels} onChange={mergeChange} placeholder={"Merges"} />
              </Col>
              <Col style={{ padding: "2px" }}>
                <FlowerComponent hero={hero} value={flowerStats} onChange={flowerChange} />
              </Col>
            </Row>
            <Row>
              <label
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "16px",
                }}
              >
                {" "}
                Asset/Flaw/Ascended:{" "}
              </label>
              <Col style={{ padding: "2px", margin: "10px" }}>
                <Traits
                  hero={hero}
                  stats={levels.superboon}
                  array={levels.array}
                  color={"#79ba8e"}
                  label={"+"}
                  onChange={assetChange}
                  placeholder={"Asset"}
                />
              </Col>
              <Col style={{ padding: "2px", margin: "10px" }}>
                <Traits
                  hero={hero}
                  stats={levels.superbane}
                  array={levels.array}
                  color={"#e68585"}
                  label={"-"}
                  onChange={flawChange}
                  placeholder={"Flaw"}
                />
              </Col>{" "}
              <Col style={{ padding: "2px", margin: "10px" }}>
                <Traits
                  hero={hero}
                  stats={levels.superboon}
                  array={levels.array}
                  color={"#79ba8e"}
                  label={"+"}
                  onChange={ascendedChange}
                  placeholder={"Ascended"}
                />
              </Col>
            </Row>
            <h3>Skills:</h3>
            <WeaponComponent hero={hero} onChangeW={changeWeapon} onChangeR={changeRefine} />
            <SkillComponent
              hero={hero}
              onChange={changeAssist}
              url={`http://localhost:5000/Assist/`}
              placeholder={"Choose Assist"}
            />
            <SkillComponent
              hero={hero}
              onChange={changeSpecial}
              url={`http://localhost:5000/Specials/`}
              placeholder={"Choose Special"}
            />
            <SkillComponent
              hero={hero}
              onChange={changeASkill}
              url={`http://localhost:5000/A_Slot/`}
              placeholder={"Choose A Skill"}
            />
            <SkillComponent
              hero={hero}
              onChange={changeBSkill}
              url={`http://localhost:5000/B_Slot/`}
              placeholder={"Choose B Skill"}
            />
            <SkillComponent
              hero={hero}
              onChange={changeCSkill}
              url={`http://localhost:5000/C_Slot/`}
              placeholder={"Choose C Skill"}
            />
            <SkillComponent
              hero={hero}
              onChange={changeSSkill}
              url={`http://localhost:5000/S_Slot/`}
              placeholder={"Choose S Skill"}
            />
          </Col>
          <Col md={3}>
            <BlessingComponent hero={hero} placeholder={"Blessing"} onChange={changeBlessing} />
            <BlessingHeroSelectionComponent
              hero={hero}
              onChange={changeBlessingStats}
              blessing={blessing}
            />
            <SwitchComponent
              res={resplendent}
              R_Artist={hero.Artist.split(",")[1]}
              onChange={handleResplendent}
              label={"Resplendant Art"}
            />
            <SwitchComponent
              res={resplendentStatsBoolean}
              R_Artist={hero.exists}
              onChange={handleResplendentStats}
              label={"Resplendant Stats"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
