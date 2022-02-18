import React from "react";
import Select from "react-select";

class SkillsA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      askills: [],
    };
    this.handleChangeA = this.handleChangeA.bind(this);
  }

  componentDidMount() {
    //handle hero/weapons/movement restrictions here
    // get only max skills from here (with the option to toggle max skills on and off)
    fetch(`http://localhost:5000/A_Slot/`)
      .then((res) => res.json())
      .then((data) => this.setState({ askills: data }));
  }

  componentDidUpdate() {
    // handle changing a slot requirements here, including movement/weapon restrictions
    // ideally this would be handled by an editted "GET" request, but I can't really test this rn
    // this should proc on changing props, which would include changing heroes so I'm just going to put a console log in here for now
    // this should also checking a possible state change from a "max skills" requirement
  }

  handleChangeA(a) {
    this.props.onChange(a);
  }

  render() {
    let aoptions = this.state.askills.map(function (skill) {
      return { value: skill, label: skill.name };
    });

    // This following section will display the table with the records of individuals.
    return (
      <div>
        A-Slot:
        <Select
          name="a-slot-skills"
          onChange={this.handleChangeA}
          isDisabled={!this.props.hero.exists}
          options={aoptions}
        />
      </div>
    );
  }
}
export default SkillsA;
