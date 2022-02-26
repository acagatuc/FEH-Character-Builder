import React from "react";
import Select from "react-select";

class SkillsAssist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assistSkills: [],
      length: 0,
    };
    this.handleChangeA = this.handleChangeA.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    //handle hero/weapons/movement restrictions here
    console.log("Assists Mounted");
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
    //include more error checking here for later, i might just have one skill component that dictates the rest
    this.getOptions(
      this.props.url + this.props.hero.weapon_type + "/" + this.props.hero.name
    );
  }

  handleChangeA(a) {
    this.props.onChange(a);
    this.forceUpdate();
  }

  async getOptions(url) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) =>
        this.setState(
          { assistSkills: data, length: data.length },
          function () {}
        )
      );
  }

  render() {
    let assistOptions = this.state.assistSkills.map(function (skill) {
      return { value: skill, label: skill.name };
    });

    // This following section will display the table with the records of individuals.
    return (
      <div>
        Assist:
        <Select
          name="assist-skills"
          onChange={this.handleChangeA}
          options={assistOptions}
          isDisabled={!this.props.hero.exists}
        />
      </div>
    );
  }
}
export default SkillsAssist;
