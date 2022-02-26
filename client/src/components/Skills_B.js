import React from "react";
import Select from "react-select";

class SkillsA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      askills: [],
      selectedSkill: "",
      length: 0,
    };
    this.handleChangeB = this.handleChangeB.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    //handle hero/weapons/movement restrictions here
    // get only max skills from here (with the option to toggle max skills on and off)
  }

  shouldComponentUpdate(nextState) {
    if (this.state.length === 0) {
      return true;
    }
    if (this.state.length !== nextState.length) {
      return true;
    }
    if (this.props.hero.name !== nextState.hero.name) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    // handle changing a slot requirements here, including movement/weapon restrictions
    // ideally this would be handled by an editted "GET" request, but I can't really test this rn
    // this should proc on changing props, which would include changing heroes so I'm just going to put a console log in here for now
    // this should also checking a possible state change from a "max skills" requirement
    var urlAddon =
      this.props.hero.move_type + "/" + this.props.hero.weapon_type + "/" + this.props.hero.name;
    this.getOptions(`http://localhost:5000/B_Slot/` + urlAddon);
  }

  handleChangeB(a) {
    if (a.value.visibleStats === "") {
      a.value.visibleStats = "0, 0, 0, 0, 0";
    }
    this.props.onChange(a);
    this.forceUpdate();
  }

  async getOptions(url) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) =>
        this.setState({ askills: data, length: data.length }, function () {})
      );
  }

  render() {
    const aoptions = []
      .concat(this.state.askills)
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(function (skill) {
        return { value: skill, label: skill.name };
      });

    // This following section will display the table with the records of individuals.
    return (
      <div>
        B-Slot:
        <Select
          name="b-slot-skills"
          onChange={this.handleChangeB}
          isDisabled={!this.props.hero.exists}
          options={aoptions}
        />
      </div>
    );
  }
}
export default SkillsA;
