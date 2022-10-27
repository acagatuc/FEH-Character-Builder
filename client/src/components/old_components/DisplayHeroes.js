import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./../App.css";
import HeroCanvas from "./HeroCanvas.js";
import BlessingComponent from "./BlessingComponent.js";
import BlessingHeroSelectionComponent from "./BlessingHeroSelectionComponent.js";

import Dropdown from "./Dropdown.js";
import WeaponComponent from "./WeaponComponent.js";
import SkillComponent from "./SkillComponent.js";
import Traits from "./Traits.js";
import Merges from "./Merges.js";
import FlowerComponent from "./FlowerComponent.js";
import SwitchComponent from "./SwitchComponent.js";

class DisplayHeroes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero: {
        name: "",
        single_name: "",
        title: "",
        hp: [],
        atk: [],
        spd: [],
        def: [],
        res: [],
        totalStats: [],
        heroSkills: {
          weapon: [],
          assist: [],
          special: [],
          passives: [],
        },
        weapon_type: "",
        move_type: "",
        character_type: "",
        merges: 0,
        blessing: "",
        eVA: "",
        artist: "",
        exists: false,
        dragonflowers: 0,
      },
      skills: {
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
      },
      levels: {
        array: [1, 1, 1, 1, 1], // levels for assets and flaws
        disabled: false,
        superboon: [],
        superbane: [],
      },
      heroLevel: 3,
      prevAsset: "",
      prevFlaw: "",
      mergedStats: [0, 0, 0, 0, 0], // stats to add to the totals based on merges
      flowerStats: [0, 0, 0, 0, 0],
      heroBuffStats: [0, 0, 0, 0, 0],
      mergeOrder: [],
      image: "",
      resplendent: false,
      resplendentStatsBoolean: false,
      resplendentStats: [0, 0, 0, 0, 0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAsset = this.handleAsset.bind(this);
    this.handleFlaw = this.handleFlaw.bind(this);
    this.handleAscended = this.handleAscended.bind(this);
    this.handleFlowers = this.handleFlowers.bind(this);
    this.handleMerges = this.handleMerges.bind(this);
    this.calculateMergeStats = this.calculateMergeStats.bind(this);
    this.addStats = this.addStats.bind(this);
    this.changeWeapon = this.changeWeapon.bind(this);
    this.changeRefine = this.changeRefine.bind(this);
    this.changeAssist = this.changeAssist.bind(this);
    this.changeSpecial = this.changeSpecial.bind(this);
    this.changeASkill = this.changeASkill.bind(this);
    this.changeBSkill = this.changeBSkill.bind(this);
    this.changeCSkill = this.changeCSkill.bind(this);
    this.changeSSkill = this.changeSSkill.bind(this);
    this.changeBlessing = this.changeBlessing.bind(this);
    this.changeBlessingStats = this.changeBlessingStats.bind(this);
    this.handleResplendent = this.handleResplendent.bind(this);
    this.handleResplendentStats = this.handleResplendentStats.bind(this);
  }

  handleChange(a) {
    if (a.value.name !== this.state.hero.name) {
      var blessing = "";
      if (
        a.value.hero_type !== "normal" ||
        a.value.hero_type !== "harmonic" ||
        a.value.hero_type !== "duo" ||
        a.value.hero_type !== "ascended"
      ) {
        blessing = a.value.hero_type;
      }

      this.setState(
        {
          levels: {
            ...this.state.levels,
            superboon: a.value.superboon,
            superbane: a.value.superbane,
          },
          hero: {
            name: a.value.name,
            title: a.value.title,
            single_name: a.value.single_name,
            hp: a.value.hp.split(",").map(Number),
            atk: a.value.atk.split(",").map(Number),
            spd: a.value.spd.split(",").map(Number),
            def: a.value.def.split(",").map(Number),
            res: a.value.res.split(",").map(Number),
            totalStats: [0, 0, 0, 0, 0],
            heroSkills: {
              weapon: a.value.weapons.split(","),
              assist: a.value.assists.split(","),
              special: a.value.specials.split(","),
              passives: a.value.passives.split(","),
            },
            weapon_type: a.value.weapon_type,
            move_type: a.value.move_type,
            character_type: a.value.hero_type,
            merges: this.state.hero.merges,
            blessing: blessing,
            eVA: a.value.EVA,
            artist: a.value.Artist.split(",")[0],
            exists: true,
            dragonflowers: a.value.dragonflowers,
          },
          skills: {
            weapon: {
              name: "",
              might: 0,
              visibleStats: [0, 0, 0, 0, 0],
              unique: false,
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
              unique: false,
            },
            special: {
              name: "",
              img: null,
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
              unique: false,
            },
            cSkill: {
              name: "",
              img: null,
              unique: false,
            },
            sSkill: {
              name: "",
              img: null,
              visibleStats: [0, 0, 0, 0, 0],
            },
          },
          flowerStats: [0, 0, 0, 0, 0],
          heroBuffStats: [0, 0, 0, 0, 0],
          resplendent: false,
          resplendentStatsBoolean: false,
          resplendentStats: [0, 0, 0, 0, 0],
        },
        this.calculateMergeStats
      );
    }
  }

  handleAsset(assetArray) {
    this.setState(
      {
        levels: {
          ...this.state.levels,
          array: assetArray,
        },
        mergedStats: [0, 0, 0, 0, 0],
      },
      this.calculateMergeStats
    );
  }

  handleFlaw(flawArray, f) {
    this.setState(
      {
        levels: {
          ...this.state.levels,
          array: flawArray,
        },
        prevFlaw: f,
        mergedStats: [0, 0, 0, 0, 0],
      },
      this.calculateMergeStats
    );
  }

  handleAscended(assetArray) {
    this.setState(
      {
        levels: {
          ...this.state.levels,
          array: assetArray,
        },
        mergedStats: [0, 0, 0, 0, 0],
      },
      this.calculateMergeStats
    );
  }

  handleFlowers(flowerArray) {
    this.setState(
      {
        flowerStats: flowerArray,
      },
      this.calculateMergeStats
    );
  }

  handleMerges(e, m) {
    this.setState(
      {
        hero: {
          ...this.state.hero,
          merges: e,
        },
        mergeOrder: m,
      },
      this.calculateMergeStats
    );
  }

  calculateMergeStats() {
    var tempArray = [0, 0, 0, 0, 0];
    var flawArray = this.state.levels.array;
    if (this.state.prevFlaw !== "") {
      if (this.state.prevFlaw === "hp") {
        flawArray[0] = 0;
      }
      if (this.state.prevFlaw === "atk") {
        flawArray[1] = 0;
      }
      if (this.state.prevFlaw === "spd") {
        flawArray[2] = 0;
      }
      if (this.state.prevFlaw === "def") {
        flawArray[3] = 0;
      }
      if (this.state.prevFlaw === "res") {
        flawArray[4] = 0;
      }
      this.setState({
        levels: {
          ...this.state.levels,
          array: flawArray,
        },
      });
    }
    if (this.state.hero.merges === 10) {
      tempArray[this.state.mergeOrder[4]] = tempArray[this.state.mergeOrder[4]] + 1;
      tempArray[this.state.mergeOrder[3]] = tempArray[this.state.mergeOrder[3]] + 1;
    }
    if (this.state.hero.merges >= 9) {
      tempArray[this.state.mergeOrder[1]] = tempArray[this.state.mergeOrder[1]] + 1;
      tempArray[this.state.mergeOrder[2]] = tempArray[this.state.mergeOrder[2]] + 1;
    }
    if (this.state.hero.merges >= 8) {
      tempArray[this.state.mergeOrder[4]] = tempArray[this.state.mergeOrder[4]] + 1;
      tempArray[this.state.mergeOrder[0]] = tempArray[this.state.mergeOrder[0]] + 1;
    }
    if (this.state.hero.merges >= 7) {
      tempArray[this.state.mergeOrder[2]] = tempArray[this.state.mergeOrder[2]] + 1;
      tempArray[this.state.mergeOrder[3]] = tempArray[this.state.mergeOrder[3]] + 1;
    }
    if (this.state.hero.merges >= 6) {
      tempArray[this.state.mergeOrder[1]] = tempArray[this.state.mergeOrder[1]] + 1;
      tempArray[this.state.mergeOrder[0]] = tempArray[this.state.mergeOrder[0]] + 1;
    }
    if (this.state.hero.merges >= 5) {
      tempArray[this.state.mergeOrder[4]] = tempArray[this.state.mergeOrder[4]] + 1;
      tempArray[this.state.mergeOrder[3]] = tempArray[this.state.mergeOrder[3]] + 1;
    }
    if (this.state.hero.merges >= 4) {
      tempArray[this.state.mergeOrder[1]] = tempArray[this.state.mergeOrder[1]] + 1;
      tempArray[this.state.mergeOrder[2]] = tempArray[this.state.mergeOrder[2]] + 1;
    }
    if (this.state.hero.merges >= 3) {
      tempArray[this.state.mergeOrder[4]] = tempArray[this.state.mergeOrder[4]] + 1;
      tempArray[this.state.mergeOrder[0]] = tempArray[this.state.mergeOrder[0]] + 1;
    }
    if (this.state.hero.merges >= 2) {
      tempArray[this.state.mergeOrder[2]] = tempArray[this.state.mergeOrder[2]] + 1;
      tempArray[this.state.mergeOrder[3]] = tempArray[this.state.mergeOrder[3]] + 1;
    }
    if (this.state.hero.merges >= 1) {
      if (this.state.prevFlaw === "" && this.state.prevAsset === "") {
        tempArray[this.state.mergeOrder[0]] = tempArray[this.state.mergeOrder[0]] + 2;
        tempArray[this.state.mergeOrder[1]] = tempArray[this.state.mergeOrder[1]] + 2;
        tempArray[this.state.mergeOrder[2]] = tempArray[this.state.mergeOrder[2]] + 1;
      } else {
        tempArray[this.state.mergeOrder[0]] = tempArray[this.state.mergeOrder[0]] + 1;
        tempArray[this.state.mergeOrder[1]] = tempArray[this.state.mergeOrder[1]] + 1;

        if (this.state.prevFlaw !== "") {
          var levelArray = this.state.levels.array;
          if (this.state.prevFlaw === "hp") {
            levelArray[0] = 1;
          }
          if (this.state.prevFlaw === "atk") {
            levelArray[1] = 1;
          }
          if (this.state.prevFlaw === "spd") {
            levelArray[2] = 1;
          }
          if (this.state.prevFlaw === "def") {
            levelArray[3] = 1;
          }
          if (this.state.prevFlaw === "res") {
            levelArray[4] = 1;
          }
          this.setState({
            levels: {
              ...this.state.levels,
              array: levelArray,
              disabled: true,
            },
          });
        }
      }
    }
    if (this.state.hero.merges === 0) {
      this.setState({
        levels: {
          ...this.state.levels,
          disabled: false,
        },
      });
    }
    this.setState(
      {
        mergedStats: tempArray,
      },
      this.addStats
    );
  }

  addStats() {
    var tempArray = [0, 0, 0, 0, 0];
    tempArray[0] =
      this.state.hero.hp[this.state.heroLevel + this.state.levels.array[0]] +
      this.state.mergedStats[0] +
      this.state.flowerStats[0] +
      this.state.heroBuffStats[0] +
      this.state.skills.weapon.visibleStats[0] +
      this.state.skills.refine.stats[0] +
      this.state.skills.aSkill.visibleStats[0] +
      this.state.resplendentStats[0];
    tempArray[1] =
      this.state.hero.atk[this.state.heroLevel + this.state.levels.array[1]] +
      this.state.mergedStats[1] +
      this.state.flowerStats[1] +
      this.state.heroBuffStats[1] +
      this.state.skills.weapon.might +
      this.state.skills.weapon.visibleStats[1] +
      this.state.skills.refine.stats[1] +
      this.state.skills.aSkill.visibleStats[1] +
      this.state.resplendentStats[1];
    tempArray[2] =
      this.state.hero.spd[this.state.heroLevel + this.state.levels.array[2]] +
      this.state.mergedStats[2] +
      this.state.flowerStats[2] +
      this.state.heroBuffStats[2] +
      this.state.skills.weapon.visibleStats[2] +
      this.state.skills.refine.stats[2] +
      this.state.skills.aSkill.visibleStats[2] +
      this.state.resplendentStats[2];
    tempArray[3] =
      this.state.hero.def[this.state.heroLevel + this.state.levels.array[3]] +
      this.state.mergedStats[3] +
      this.state.flowerStats[3] +
      this.state.heroBuffStats[3] +
      this.state.skills.weapon.visibleStats[3] +
      this.state.skills.refine.stats[3] +
      this.state.skills.aSkill.visibleStats[3] +
      this.state.resplendentStats[3];
    tempArray[4] =
      this.state.hero.res[this.state.heroLevel + this.state.levels.array[4]] +
      this.state.mergedStats[4] +
      this.state.flowerStats[4] +
      this.state.heroBuffStats[4] +
      this.state.skills.weapon.visibleStats[4] +
      this.state.skills.refine.stats[4] +
      this.state.skills.aSkill.visibleStats[4] +
      this.state.resplendentStats[4];
    this.setState({
      hero: {
        ...this.state.hero,
        totalStats: tempArray,
      },
    });
  }
  changeWeapon(w) {
    this.setState(
      {
        skills: {
          ...this.state.skills,
          weapon: {
            name: w.value.name,
            might: +w.value.might,
            visibleStats: w.value.visibleStats.split(",").map(Number),
            refine: w.value.refine,
          },
        },
      },
      this.addStats
    );
  }
  changeRefine(stats, r, url) {
    this.setState(
      {
        skills: {
          ...this.state.skills,
          refine: {
            name: r.name,
            description: r.description,
            stats: stats,
            img: "https://fehskills.s3.amazonaws.com/" + url + ".png",
          },
        },
      },
      this.addStats
    );
  }
  changeAssist(a) {
    this.setState(
      {
        skills: {
          ...this.state.skills,
          assist: a.value,
        },
      },
      this.addStats
    );
  }
  changeSpecial(s) {
    this.setState(
      {
        skills: {
          ...this.state.skills,
          special: s.value,
        },
      },
      this.addStats
    );
  }
  changeASkill(a) {
    if (a.value.visibleStats === "") {
      a.value.visibleStats = "0, 0, 0, 0, 0";
    }
    this.setState(
      {
        skills: {
          ...this.state.skills,
          aSkill: {
            name: a.value.name,
            description: a.value.description,
            visibleStats: a.value.visibleStats.split(",").map(Number),
          },
        },
      },
      this.addStats
    );
  }
  changeBSkill(b) {
    if (b.value.visibleStats === "") {
      b.value.visibleStats = "0, 0, 0, 0, 0";
    }
    this.setState(
      {
        skills: {
          ...this.state.skills,
          bSkill: {
            name: b.value.name,
            description: b.value.description,
            visibleStats: b.value.visibleStats.split(",").map(Number),
          },
        },
      },
      this.addStats
    );
  }
  changeCSkill(c) {
    if (c.value.visibleStats === "") {
      c.value.visibleStats = "0, 0, 0, 0, 0";
    }
    this.setState(
      {
        skills: {
          ...this.state.skills,
          cSkill: {
            name: c.value.name,
            description: c.value.description,
            visibleStats: c.value.visibleStats.split(",").map(Number),
          },
        },
      },
      this.addStats
    );
  }
  changeSSkill(s) {
    if (s.value.visibleStats === "") {
      s.value.visibleStats = "0, 0, 0, 0, 0";
    }
    this.setState(
      {
        skills: {
          ...this.state.skills,
          sSkill: s.value,
        },
      },
      this.addStats
    );
  }
  changeBlessing(b) {
    this.setState(
      {
        hero: {
          ...this.state.hero,
          blessing: b.value,
        },
      },
      this.addStats
    );
  }
  changeBlessingStats(heroBuffs) {
    this.setState(
      {
        heroBuffStats: heroBuffs,
      },
      this.calculateMergeStats
    );
  }

  handleResplendent(res) {
    this.setState({ resplendent: res });
  }

  handleResplendentStats(r) {
    if (r) {
      this.setState({ resplendentStatsBoolean: true });
      this.setState({ resplendentStats: [2, 2, 2, 2, 2] }, this.calculateMergeStats);
    } else {
      this.setState({ resplendentStatsBoolean: false });
      this.setState({ resplendentStats: [0, 0, 0, 0, 0] }, this.calculateMergeStats);
    }
  }

  render() {
    // This following section will display the entire-ish webpage
    return (
      <div>
        <Container className="noMargin">
          <Row>
            <Col style={{ padding: "0px" }}>
              <HeroCanvas
                name={this.state.hero.single_name}
                title={this.state.hero.title}
                merges={this.state.hero.merges}
                stats={this.state.hero.totalStats}
                skills={this.state.skills}
                va={this.state.hero.eVA}
                art={this.state.hero.artist}
                image={
                  this.state.resplendent
                    ? "https://fehportraits.s3.amazonaws.com/Resplendent " +
                      this.state.hero.name +
                      ".png"
                    : "https://fehportraits.s3.amazonaws.com/" + this.state.hero.name + ".png"
                }
                background={"https://fehportraits.s3.amazonaws.com/bg_normal.png"}
                ui={"https://fehportraits.s3.amazonaws.com/updated ui.png"}
                move_type={
                  "https://fehskills.s3.amazonaws.com/" + this.state.hero.move_type + ".png"
                }
                weapon_type={
                  "https://fehskills.s3.amazonaws.com/" +
                  this.state.hero.weapon_type.toLowerCase() +
                  ".png"
                }
                blessing={"https://fehskills.s3.amazonaws.com/" + this.state.hero.blessing + ".png"}
              />
            </Col>
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
                    onChange={this.handleChange}
                    url={"http://localhost:5000/Heroes/"}
                    title={"Select Hero"}
                    hero={this.state.hero}
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
                  <Merges
                    hero={this.state.hero}
                    levels={this.state.levels}
                    onChange={this.handleMerges}
                    placeholder={"Merges"}
                  />
                </Col>
                <Col style={{ padding: "2px" }}>
                  <FlowerComponent
                    hero={this.state.hero}
                    value={this.state.flowerStats}
                    onChange={this.handleFlowers}
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
                  Asset/Flaw/Ascended:{" "}
                </label>
                <Col style={{ padding: "2px", margin: "10px" }}>
                  <Traits
                    hero={this.state.hero}
                    stats={this.state.levels.superboon}
                    array={this.state.levels.array}
                    color={"#79ba8e"}
                    label={"+"}
                    onChange={this.handleAsset}
                    placeholder={"Asset"}
                  />
                </Col>
                <Col style={{ padding: "2px", margin: "10px" }}>
                  <Traits
                    hero={this.state.hero}
                    stats={this.state.levels.superbane}
                    array={this.state.levels.array}
                    color={"#e68585"}
                    label={"-"}
                    onChange={this.handleFlaw}
                    placeholder={"Flaw"}
                  />
                </Col>{" "}
                <Col style={{ padding: "2px", margin: "10px" }}>
                  <Traits
                    hero={this.state.hero}
                    stats={this.state.levels.superboon}
                    array={this.state.levels.array}
                    color={"#79ba8e"}
                    label={"+"}
                    onChange={this.handleAscended}
                    placeholder={"Ascended"}
                  />
                </Col>
              </Row>
              <h3>Skills:</h3>
              <WeaponComponent
                hero={this.state.hero}
                placeholder={"Weapon"}
                onChangeW={this.changeWeapon}
                onChangeR={this.changeRefine}
              />
              <SkillComponent
                hero={this.state.hero}
                onChange={this.changeAssist}
                url={`http://localhost:5000/Assist/`}
                placeholder={"Choose Assist"}
              />
              <SkillComponent
                hero={this.state.hero}
                onChange={this.changeSpecial}
                url={`http://localhost:5000/Specials/`}
                placeholder={"Choose Special"}
              />
              <SkillComponent
                hero={this.state.hero}
                onChange={this.changeASkill}
                url={`http://localhost:5000/A_Slot/`}
                placeholder={"Choose A Skill"}
              />
              <SkillComponent
                hero={this.state.hero}
                onChange={this.changeBSkill}
                url={`http://localhost:5000/B_Slot/`}
                placeholder={"Choose B Skill"}
              />
              <SkillComponent
                hero={this.state.hero}
                onChange={this.changeCSkill}
                url={`http://localhost:5000/C_Slot/`}
                placeholder={"Choose C Skill"}
              />
              <SkillComponent
                hero={this.state.hero}
                onChange={this.changeSSkill}
                url={`http://localhost:5000/S_Slot/`}
                placeholder={"Choose S Skill"}
              />
            </Col>
            <Col md={3}>
              <BlessingComponent
                hero={this.state.hero}
                placeholder={"Blessing"}
                onChange={this.changeBlessing}
              />
              <BlessingHeroSelectionComponent
                hero={this.state.hero}
                onChange={this.changeBlessingStats}
                blessing={this.state.hero.blessing}
              />
              <SwitchComponent
                res={this.state.resplendent}
                onChange={this.handleResplendent}
                label={"Resplendant Art"}
              />
              <SwitchComponent
                res={this.state.resplendentStatsBoolean}
                onChange={this.handleResplendentStats}
                label={"Resplendant Stats"}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default DisplayHeroes;
