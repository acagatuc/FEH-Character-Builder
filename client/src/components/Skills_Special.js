import React from "react";
import Select from "react-select";

class SkillsSpecial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specials: [],
      length: 0,
    };
    this.handleChangeS = this.handleChangeS.bind(this);
  }

  componentDidMount() {
    //handle hero/weapons/movement restrictions here
    console.log("Specials Mounted");
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.length === 0) {
      return true;
    }
    if (this.state.length !== nextState.length) {
      return true;
    }
    if (this.props.hero.name !== nextProps.hero.name) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    this.getOptions(
      `http://localhost:5000/Specials/` +
        this.props.hero.weapon_type +
        "/" +
        this.props.hero.name
    );
  }

  handleChangeS(s) {
    this.props.onChange(s);
    this.forceUpdate();
  }

  async getOptions(url) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) =>
        this.setState({ specials: data, length: data.length }, function () {})
      );
  }

  render() {
    let soptions = this.state.specials.map(function (skill) {
      return { value: skill, label: skill.name };
    });

    // This following section will display the table with the records of individuals.
    return (
      <div>
        Special:
        <Select
          name="specials"
          onChange={this.handleChangeS}
          options={soptions}
          isDisabled={!this.props.hero.exists}
        />
      </div>
    );
  }
}
export default SkillsSpecial;
