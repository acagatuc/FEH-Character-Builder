import React from "react";
import Select from "react-select";
import { Container, Col, Row } from "react-bootstrap";

class SkillsWeapon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weapons: [],
      selectedWeapon: "",
      refines: [],
      selectedRefine: "",
      length: 0,
      disabled: true,
    };
    this.handleChangeW = this.handleChangeW.bind(this);
    this.handleChangeR = this.handleChangeR.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    console.log("Mount");
    // handle refines and such here (i.e. enabling the refine select)
    // also handle refines in this file (have a secondary select for refines and enable and disable refines from here)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.length === 0) {
      return true;
    }
    if (this.state.length !== nextState.length) {
      return true;
    }
    if (this.props.hero.name !== nextProps.hero.name) {
      this.setState({
        disabled: true,
        selectedWeapon: { value: 0, label: "Select..." },
        selectedRefine: { value: 0, label: "Select..." },
        refines: [],
      });
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    var wt = this.props.hero.weapon_type;
    var eh = "";
    if (
      this.props.hero.weapon_type.includes("Beast") ||
      this.props.hero.weapon_type.includes("Dragon")
    ) {
      eh = this.props.hero.weapon_type.split(" ");
      wt = eh[1];
    }
    if (
      this.props.hero.weapon_type.includes("Dagger") ||
      this.props.hero.weapon_type.includes("Bow")
    ) {
      eh = this.props.hero.weapon_type.split(" ");
      wt = eh[1] + "s";
    }
    this.getOptions(
      `http://localhost:5000/GenericWeapons/` + wt + "/" + this.props.hero.name
    );
  }

  handleChangeW(w) {
    var boolean = false;
    if (w.value.refine === "TRUE") {
      boolean = true;
      this.getRefines(w);
    }
    this.setState(
      {
        disabled: !boolean,
        selectedWeapon: w,
      },
      function () {}
    );
    this.props.onChangeW(w);
    this.forceUpdate();
  }

  handleChangeR(index) {
    this.setState(
      {
        selectedRefine: index,
      },
      function () {}
    );
    var tempStats = [0, 0, 0, 0, 0];
    var grs = this.state.refines.genericRefine.split(",").map(Number);
    if (index.value === 0) {
      tempStats = this.state.refines.uniqueRefine.split(",").map(Number);
    } else if (index.value === 1) {
      tempStats[0] = grs[0];
      tempStats[1] = grs[1];
    } else if (index.value === 2) {
      tempStats[0] = grs[0];
      tempStats[2] = grs[2];
    } else if (index.value === 3) {
      tempStats[0] = grs[0];
      tempStats[3] = grs[3];
    } else if (index.value === 4) {
      tempStats[0] = grs[0];
      tempStats[4] = grs[4];
    }
    this.props.onChangeR(tempStats, this.state.refines, index.value);
    this.forceUpdate();
  }

  async getOptions(url) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => this.setState({ weapons: data, length: data.length }));
  }

  async getRefines(w) {
    await fetch(`http://localhost:5000/Refines/` + w.value.name)
      .then((res) => res.json())
      .then((data) => this.setState({ refines: data }));
    this.forceUpdate();
  }

  render() {
    const weaponStyles = {
      option: (styles, { data, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: this.props.hero.heroSkills.weapon.includes(
            data.label
          )
            ? "green"
            : "pink",
          color: "black",
          "&:hover": {
            // Overwrittes the different states of border
            backgroundColor: "#deebff",
          },
        };
      },
    };

    const weaponOptions = []
      .concat(this.state.weapons)
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(function (skill) {
        return { value: skill, label: skill.name };
      });

    var refineOptions = [];
    if (this.state.refines && this.state.selectedWeapon) {
      if (this.props.hero.weapon_type === "Gray Staff") {
        if (this.state.refines.uniqueRefine === "") {
          refineOptions = [
            { value: "dazzling", label: "Dazzling Staff" },
            { value: "wrathful", label: "Wrathful Staff" },
          ];
        } else {
          refineOptions = [
            {
              value: this.state.selectedWeapon.value.name,
              label: "+Unique Effect: " + this.state.selectedWeapon.value.name,
            },
          ];
        }
      } else if (this.state.refines.uniqueRefine === "") {
        refineOptions = [
          { value: "atk_refine", label: "+Atk" },
          { value: "spd_refine", label: "+Spd" },
          { value: "def_refine", label: "+Def" },
          { value: "res_refine", label: "+Res" },
        ];
      } else {
        refineOptions = [
          {
            value: this.state.selectedWeapon.value.name,
            label: "+Unique Effect: " + this.state.selectedWeapon.value.name,
          },
          { value: "atk_refine", label: "+Atk" },
          { value: "spd_refine", label: "+Spd" },
          { value: "def_refine", label: "+Def" },
          { value: "res_refine", label: "+Res" },
        ];
      }
    }

    // This following section will display the table with the records of individuals.
    return (
      <div>
        Weapon/Refine:
        <Row>
          <Col style={{ padding: "2px" }}>
            <Select
              name="weapon-select"
              styles={weaponStyles}
              value={this.state.selectedWeapon}
              onChange={this.handleChangeW}
              options={weaponOptions}
              isDisabled={!this.props.hero.exists}
            />
          </Col>
          <Col style={{ padding: "2px" }}>
            <Select
              name="weapon-select"
              onChange={this.handleChangeR}
              value={this.state.selectedRefine}
              options={refineOptions}
              isDisabled={this.state.disabled}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default SkillsWeapon;
