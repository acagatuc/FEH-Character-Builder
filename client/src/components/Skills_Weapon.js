import React from "react";
import Select from "react-select";

class SkillsWeapon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weapons: [],
      refines: [],
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
      });
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    var wt = this.props.hero.weapon_type;
    if (
      this.props.hero.weapon_type.includes("Beast") ||
      this.props.hero.weapon_type.includes("Dragon")
    ) {
      var eh = this.props.hero.weapon_type.split(" ");
      wt = eh[1];
    }
    if (
      this.props.hero.weapon_type.includes("Dagger") ||
      this.props.hero.weapon_type.includes("Bow")
    ) {
      var eh = this.props.hero.weapon_type.split(" ");
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
      },
      function () {}
    );
    this.props.onChangeW(w);
    this.forceUpdate();
  }

  handleChangeR(index) {
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
    this.props.onChangeR(tempStats, this.state.refines);
    this.forceUpdate();
  }

  async getOptions(url) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) =>
        this.setState({ weapons: data, length: data.length }, function () {})
      );
  }

  async getRefines(w) {
    await fetch(`http://localhost:5000/Refines/` + w.value.name)
      .then((res) => res.json())
      .then((data) => this.setState({ refines: data }));
  }

  render() {
    const weaponStyles = {
      option: (styles, { data, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor:
            data.label === this.props.hero.heroSkills[0] ||
            data.label === this.props.hero.heroSkills[1]
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

    let weaponOptions = this.state.weapons.map(function (skill) {
      return { value: skill, label: skill.name };
    });

    var refineOptions = [];
    if (this.state.refines) {
      if (this.state.refines.uniqueRefine === null) {
        refineOptions = [
          { value: 1, label: "+Atk" },
          { value: 2, label: "+Spd" },
          { value: 3, label: "+Def" },
          { value: 4, label: "+Res" },
        ];
      } else {
        refineOptions = [
          { value: 0, label: "+Unique Effect: " + this.state.refines.name },
          { value: 1, label: "+Atk" },
          { value: 2, label: "+Spd" },
          { value: 3, label: "+Def" },
          { value: 4, label: "+Res" },
        ];
      }
    }
    // This following section will display the table with the records of individuals.
    return (
      <div>
        Weapon:
        <Select
          name="weapon-select"
          styles={weaponStyles}
          onChange={this.handleChangeW}
          options={weaponOptions}
          isDisabled={!this.props.hero.exists}
        />
        <input type="checkbox" />
        Refine:
        <Select
          name="weapon-select"
          onChange={this.handleChangeR}
          options={refineOptions}
          isDisabled={this.state.disabled}
        />
      </div>
    );
  }
}
export default SkillsWeapon;
