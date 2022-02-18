import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./../App.css";
import HeroList from "./HeroList.js";
import HeroCanvas from "./HeroCanvas.js";
import MergeComponent from "./MergeComponent.js";
import AssetComponent from "./AssetComponent.js";
import FlawComponent from "./FlawComponent.js";
import FlowerComponent from "./FlowerComponent.js";
import SkillsWeapon from "./Skills_Weapon.js";
import SkillsAssist from "./Skills_Assist.js";
import SkillsSpecial from "./Skills_Special.js";
import SkillsA from "./Skills_A.js";
import SkillsB from "./Skills_B.js";
import SkillsC from "./Skills_C.js";
import SkillsS from "./Skills_S.js";
import TabsComponent from "./TabsComponent.js";

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
        heroSkills: [],
        weapon_type: "",
        move_type: "",
        character_type: "",
        merges: 0,
        exists: false,
      },
      skills: {
        weapon: {
          name: "-",
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
          name: "-",
          img: null,
          unique: false,
        },
        special: {
          name: "-",
          img: null,
          unique: false,
        },
        aSkill: {
          name: "-",
          img: null,
          visibleStats: [0, 0, 0, 0, 0],
          unique: false,
        },
        bSkill: {
          name: "-",
          img: null,
          unique: false,
        },
        cSkill: {
          name: "-",
          img: null,
          unique: false,
        },
        sSkill: {
          name: "-",
          img: null,
          visibleStats: [0, 0, 0, 0, 0],
        },
      },
      levels: {
        array: [1, 1, 1, 1, 1], // levels for assets and flaws
        disabled: false,
        superboon: [],
        superbane: [],
      },
      disabledSkills: true,
      heroLevel: 3,
      prevAsset: "",
      prevFlaw: "",
      mergedStats: [0, 0, 0, 0, 0], // stats to add to the totals based on merges
      flowerStats: [0, 0, 0, 0, 0],
      mergeOrder: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAsset = this.handleAsset.bind(this);
    this.handleFlaw = this.handleFlaw.bind(this);
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
  }

  handleChange(a) {
    if (a.value.name !== this.state.hero.name) {
      var tempArray = [];
      if (a.value.superboon.includes("hp")) {
        tempArray.push("#79ba8e");
      } else {
        tempArray.push("white");
      }
      if (a.value.superboon.includes("atk")) {
        tempArray.push("#79ba8e");
      } else {
        tempArray.push("white");
      }
      if (a.value.superboon.includes("spd")) {
        tempArray.push("#79ba8e");
      } else {
        tempArray.push("white");
      }
      if (a.value.superboon.includes("def")) {
        tempArray.push("#79ba8e");
      } else {
        tempArray.push("white");
      }
      if (a.value.superboon.includes("res")) {
        tempArray.push("#79ba8e");
      } else {
        tempArray.push("white");
      }

      var tempArray2 = [];
      if (a.value.superbane.includes("hp")) {
        tempArray2.push("#e68585");
      } else {
        tempArray2.push("white");
      }
      if (a.value.superbane.includes("atk")) {
        tempArray2.push("#e68585");
      } else {
        tempArray2.push("white");
      }
      if (a.value.superbane.includes("spd")) {
        tempArray2.push("#e68585");
      } else {
        tempArray2.push("white");
      }
      if (a.value.superbane.includes("def")) {
        tempArray2.push("#e68585");
      } else {
        tempArray2.push("white");
      }
      if (a.value.superbane.includes("res")) {
        tempArray2.push("#e68585");
      } else {
        tempArray2.push("white");
      }

      this.setState(
        {
          levels: {
            ...this.state.levels,
            superboon: tempArray,
            superbane: tempArray2,
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
            heroSkills: a.value.skills.split(","),
            weapon_type: a.value.weapon_type,
            move_type: a.value.move_type,
            character_type: a.value.hero_type,
            merges: this.state.hero.merges,
            exists: true,
          },
          skills: {
            weapon: {
              name: "-",
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
              name: "-",
              img: null,
              unique: false,
            },
            special: {
              name: "-",
              img: null,
              unique: false,
            },
            aSkill: {
              name: "-",
              img: null,
              visibleStats: [0, 0, 0, 0, 0],
              unique: false,
            },
            bSkill: {
              name: "-",
              img: null,
              unique: false,
            },
            cSkill: {
              name: "-",
              img: null,
              unique: false,
            },
            sSkill: {
              name: "-",
              img: null,
              visibleStats: [0, 0, 0, 0, 0],
            },
            disabledSkills: false,
          },
          flowerStats: [0, 0, 0, 0, 0],
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
      tempArray[this.state.mergeOrder[4]] =
        tempArray[this.state.mergeOrder[4]] + 1;
      tempArray[this.state.mergeOrder[3]] =
        tempArray[this.state.mergeOrder[3]] + 1;
    }
    if (this.state.hero.merges >= 9) {
      tempArray[this.state.mergeOrder[1]] =
        tempArray[this.state.mergeOrder[1]] + 1;
      tempArray[this.state.mergeOrder[2]] =
        tempArray[this.state.mergeOrder[2]] + 1;
    }
    if (this.state.hero.merges >= 8) {
      tempArray[this.state.mergeOrder[4]] =
        tempArray[this.state.mergeOrder[4]] + 1;
      tempArray[this.state.mergeOrder[0]] =
        tempArray[this.state.mergeOrder[0]] + 1;
    }
    if (this.state.hero.merges >= 7) {
      tempArray[this.state.mergeOrder[2]] =
        tempArray[this.state.mergeOrder[2]] + 1;
      tempArray[this.state.mergeOrder[3]] =
        tempArray[this.state.mergeOrder[3]] + 1;
    }
    if (this.state.hero.merges >= 6) {
      tempArray[this.state.mergeOrder[1]] =
        tempArray[this.state.mergeOrder[1]] + 1;
      tempArray[this.state.mergeOrder[0]] =
        tempArray[this.state.mergeOrder[0]] + 1;
    }
    if (this.state.hero.merges >= 5) {
      tempArray[this.state.mergeOrder[4]] =
        tempArray[this.state.mergeOrder[4]] + 1;
      tempArray[this.state.mergeOrder[3]] =
        tempArray[this.state.mergeOrder[3]] + 1;
    }
    if (this.state.hero.merges >= 4) {
      tempArray[this.state.mergeOrder[1]] =
        tempArray[this.state.mergeOrder[1]] + 1;
      tempArray[this.state.mergeOrder[2]] =
        tempArray[this.state.mergeOrder[2]] + 1;
    }
    if (this.state.hero.merges >= 3) {
      tempArray[this.state.mergeOrder[4]] =
        tempArray[this.state.mergeOrder[4]] + 1;
      tempArray[this.state.mergeOrder[0]] =
        tempArray[this.state.mergeOrder[0]] + 1;
    }
    if (this.state.hero.merges >= 2) {
      tempArray[this.state.mergeOrder[2]] =
        tempArray[this.state.mergeOrder[2]] + 1;
      tempArray[this.state.mergeOrder[3]] =
        tempArray[this.state.mergeOrder[3]] + 1;
    }
    if (this.state.hero.merges >= 1) {
      if (this.state.prevFlaw === "" && this.state.prevAsset === "") {
        tempArray[this.state.mergeOrder[0]] =
          tempArray[this.state.mergeOrder[0]] + 2;
        tempArray[this.state.mergeOrder[1]] =
          tempArray[this.state.mergeOrder[1]] + 2;
        tempArray[this.state.mergeOrder[2]] =
          tempArray[this.state.mergeOrder[2]] + 1;
      } else {
        tempArray[this.state.mergeOrder[0]] =
          tempArray[this.state.mergeOrder[0]] + 1;
        tempArray[this.state.mergeOrder[1]] =
          tempArray[this.state.mergeOrder[1]] + 1;

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
      this.state.skills.weapon.visibleStats[0] +
      this.state.skills.refine.stats[0];
    tempArray[1] =
      this.state.hero.atk[this.state.heroLevel + this.state.levels.array[1]] +
      this.state.mergedStats[1] +
      this.state.flowerStats[1] +
      this.state.skills.weapon.might +
      this.state.skills.weapon.visibleStats[1] +
      this.state.skills.refine.stats[1];
    tempArray[2] =
      this.state.hero.spd[this.state.heroLevel + this.state.levels.array[2]] +
      this.state.mergedStats[2] +
      this.state.flowerStats[2] +
      this.state.skills.weapon.visibleStats[2] +
      this.state.skills.refine.stats[2];
    tempArray[3] =
      this.state.hero.def[this.state.heroLevel + this.state.levels.array[3]] +
      this.state.mergedStats[3] +
      this.state.flowerStats[3] +
      this.state.skills.weapon.visibleStats[3] +
      this.state.skills.refine.stats[3];
    tempArray[4] =
      this.state.hero.res[this.state.heroLevel + this.state.levels.array[4]] +
      this.state.mergedStats[4] +
      this.state.flowerStats[4] +
      this.state.skills.weapon.visibleStats[4] +
      this.state.skills.refine.stats[4];
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
  changeRefine(stats, r) {
    this.setState(
      {
        skills: {
          ...this.state.skills,
          refine: {
            name: r.name,
            description: r.description,
            stats: stats,
          },
        },
      },
      this.addStats
    );
  }
  changeAssist(a) {
    this.setState({
      skills: {
        ...this.state.skills,
        assist: a.value,
      },
    });
  }
  changeSpecial(s) {
    this.setState({
      skills: {
        ...this.state.skills,
        special: s.value,
      },
    });
  }
  changeASkill(a) {
    this.setState({
      skills: {
        ...this.state.skills,
        aSkill: a.value,
      },
    });
  }
  changeBSkill(b) {
    this.setState({
      skills: {
        ...this.state.skills,
        bSkill: b.value,
      },
    });
  }
  changeCSkill(c) {
    this.setState({
      skills: {
        ...this.state.skills,
        cSkill: c.value,
      },
    });
  }
  changeSSkill(s) {
    this.setState({
      skills: {
        ...this.state.skills,
        sSkill: s.value,
      },
    });
  }

  render() {
    function importAll(r) {
      let images = {};
      r.keys().forEach((item, index) => {
        images[item.replace("./", "")] = r(item);
      });
      return images;
    }

    const images = importAll(
      require.context("../img", false, /\.(png|jpe?g|svg)$/)
    );

    if (!this.state.levels.array) {
      return <div> yeah this happens </div>;
    }

    // This following section will display the entire-ish webpage
    return (
      <div>
        <Container className="noMargin">
          <Row>
            <Col>
              <HeroCanvas
                name={this.state.hero.single_name}
                title={this.state.hero.title}
                merges={this.state.hero.merges}
                stats={this.state.hero.totalStats}
                skills={this.state.skills}
                image={images[`${this.state.hero.name}.png`]}
                background={images[`bg_normal.png`]}
                ui={images[`updated ui.png`]}
                weapon={images[`Weapon.png`]}
                assist={images[`Assist.png`]}
                special={images[`Special.png`]}
              ></HeroCanvas>
            </Col>
            <Col>
              <h3>Base Stats:</h3>
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
                  <HeroList onChange={this.handleChange} />
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
                  <MergeComponent
                    hero={this.state.hero}
                    value={this.state}
                    onChange={this.handleMerges}
                  ></MergeComponent>
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
                  Asset/Flaw:{" "}
                </label>
                <Col style={{ padding: "2px" }}>
                  <AssetComponent
                    hero={this.state.hero}
                    value={this.state.levels}
                    onChange={this.handleAsset}
                  />
                </Col>
                <Col style={{ padding: "2px" }}>
                  <FlawComponent
                    hero={this.state.hero}
                    value={this.state.levels}
                    onChange={this.handleFlaw}
                  />
                </Col>
              </Row>
              <h3>Skills:</h3>
            </Col>
            <Col md={3}>
              <SkillsWeapon
                hero={this.state.hero}
                onChangeW={this.changeWeapon}
                onChangeR={this.changeRefine}
              />
              <SkillsAssist
                hero={this.state.hero}
                url={`http://localhost:5000/Assist/`}
                onChange={this.changeAssist}
              />
              <SkillsSpecial
                hero={this.state.hero}
                onChange={this.changeSpecial}
              />
              <SkillsA hero={this.state.hero} onChange={this.changeASkill} />
              <SkillsB hero={this.state.hero} onChange={this.changeBSkill} />
              <SkillsC hero={this.state.hero} onChange={this.changeCSkill} />
              <SkillsS hero={this.state.hero} onChange={this.changeSSkill} />
              <TabsComponent />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default DisplayHeroes;
