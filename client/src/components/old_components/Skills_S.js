import React from "react";
import Select from "react-select";

class SkillsS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sskills: [],
      s: {
        name: "",
        description: "",
        img: "",
      },
    };
    this.handleChangeS = this.handleChangeS.bind(this);
  }

  componentDidMount() {
    //handle hero/weapons/movement restrictions here
    fetch(`http://localhost:5000/S_Slot/`)
      .then((res) => res.json())
      .then((data) => this.setState({ sskills: data }));
  }

  handleChangeS(s) {
    this.setState({
      s: {
        name: s.value.name,
        description: s.value.description,
        img: s.value.img,
        visibleStats: s.value.visibleStats,
      },
    });
    this.props.onChange(s);
  }

  render() {
    let soptions = this.state.sskills.map(function (skill) {
      return { value: skill, label: skill.name };
    });

    // This following section will display the table with the records of individuals.
    return (
      <div>
        S-Slot:
        <Select
          name="s-slot-skills"
          onChange={this.handleChangeS}
          isDisabled={!this.props.hero.exists}
          options={soptions}
        />
      </div>
    );
  }
}
export default SkillsS;
