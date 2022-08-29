import React from "react";
import Select from "react-select";

class DisplaySkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      askills: [],
      bskills: [],
      cskills: [],
      a: {
        name: "",
        description: "",
        img: "",
      },
      b: {
        name: "",
        description: "",
        img: "",
      },
      c: {
        name: "",
        description: "",
        img: "",
      },
    };
    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.handleChangeC = this.handleChangeC.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:5000/A_Slot/`)
      .then((res) => res.json())
      .then((data) => this.setState({ askills: data }));
    fetch(`http://localhost:5000/B_Slot/`)
      .then((res) => res.json())
      .then((data) => this.setState({ bskills: data }));
    fetch(`http://localhost:5000/C_Slot/`)
      .then((res) => res.json())
      .then((data) => this.setState({ cskills: data }));
  }

  componentDidUpdate() {}

  handleChangeA(a) {
    this.setState({
      a: {
        name: a.value.name,
        description: a.value.description,
        img: a.value.img,
      },
    });
    this.props.onChange(a);
  }
  handleChangeB(b) {
    this.setState({
      b: {
        name: b.value.name,
        description: b.value.description,
        img: b.value.img,
      },
    });
    console.log("hit b");
  }
  handleChangeC(c) {
    this.setState({
      c: {
        name: c.value.name,
        description: c.value.description,
        img: c.value.img,
      },
    });
    console.log("hit c");
  }

  render() {
    let aoptions = this.state.askills.map(function (skill) {
      return { value: skill, label: skill.name };
    });

    let boptions = this.state.bskills.map(function (skill) {
      return { value: skill, label: skill.name };
    });

    let coptions = this.state.cskills.map(function (skill) {
      return { value: skill, label: skill.name };
    });
    // This following section will display the table with the records of individuals.
    return (
      <div>
        <label>Skill List</label>
        <br></br>
        <Select
          name="a-slot-skills"
          onChange={this.handleChangeA}
          options={aoptions}
        />
        <br></br>
        <Select
          name="b-slot-skills"
          onChange={this.handleChangeB}
          options={boptions}
        />
        <br></br>
        <Select
          name="c-slot-skills"
          onChange={this.handleChangeC}
          options={coptions}
        />

        <br></br>
        <label>Chosen Skills:</label>
        <p>
          A: {this.state.a.name}: {this.state.a.description}
          <br></br>
          B: {this.state.b.name}: {this.state.b.description}
          <br></br>
          C: {this.state.c.name}: {this.state.c.description}
          <br></br>
        </p>
      </div>
    );
  }
}
export default DisplaySkills;
