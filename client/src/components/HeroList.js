import React from "react";
import Select from "react-select";

class HeroList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroList: [],
    };
    this.handleHero = this.handleHero.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:5000/Heroes/`)
      .then((res) => res.json())
      .then((data) => this.setState({ heroList: data }));
  }

  handleHero(e) {
    this.props.onChange(e);
  }

  render() {
    let options = this.state.heroList.map(function (hero) {
      return { value: hero, label: hero.name };
    });

    return (
      <div>
        <Select name="heroes" onChange={this.handleHero} options={options} />
      </div>
    );
  }
}

export default HeroList;
