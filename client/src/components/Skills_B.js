import React from "react";
import Select from "react-select";

class SkillsB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bskills: [],
      b: {
        name: "",
        description: "",
        img: "",
      },
    };
    this.handleChangeB = this.handleChangeB.bind(this);
  }

  componentDidMount() {
    //handle hero restrictions here
    fetch(`http://localhost:5000/B_Slot/`)
      .then((res) => res.json())
      .then((data) => this.setState({ bskills: data }));
  }

  handleChangeB(b) {
    this.setState({
      b: {
        name: b.value.name,
        description: b.value.description,
        img: b.value.img,
        visibleStats: b.value.visibleStats,
      },
    });
    this.props.onChange(b);
  }

  render() {
    let boptions = this.state.bskills.map(function (skill) {
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
          options={boptions}
        />
      </div>
    );
  }
}
export default SkillsB;
