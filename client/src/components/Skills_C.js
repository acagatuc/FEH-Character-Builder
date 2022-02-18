import React from "react";
import Select from "react-select";

class SkillsC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cskills: [],
      c: {
        name: "",
        description: "",
        img: "",
      },
    };
    this.handleChangeC = this.handleChangeC.bind(this);
  }

  componentDidMount() {
    //handle hero/weapons/movement restrictions here
    fetch(`http://localhost:5000/C_Slot/`)
      .then((res) => res.json())
      .then((data) => this.setState({ cskills: data }));
  }

  handleChangeC(c) {
    this.setState({
      c: {
        name: c.value.name,
        description: c.value.description,
        img: c.value.img,
        visibleStats: c.value.visibleStats,
      },
    });
    this.props.onChange(c);
  }

  render() {
    let coptions = this.state.cskills.map(function (skill) {
      return { value: skill, label: skill.name };
    });

    // This following section will display the table with the records of individuals.
    return (
      <div>
        C-Slot:
        <Select
          name="c-slot-skills"
          onChange={this.handleChangeC}
          isDisabled={!this.props.hero.exists}
          options={coptions}
        />
      </div>
    );
  }
}
export default SkillsC;
