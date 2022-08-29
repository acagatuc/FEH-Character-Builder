import React from "react";
import Select from "react-select";
import "./HeroCanvas.css";

class AscendedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevAsset: "",
    };
    this.handleAscended = this.handleAscended.bind(this);
  }

  handleAscended(e) {
    var tempArray = this.props.levels.array;
    if (this.state.prevAsset !== "") {
      if (this.state.prevAsset === "hp") {
        tempArray[0] = 1;
      }
      if (this.state.prevAsset === "atk") {
        tempArray[1] = 1;
      }
      if (this.state.prevAsset === "spd") {
        tempArray[2] = 1;
      }
      if (this.state.prevAsset === "def") {
        tempArray[3] = 1;
      }
      if (this.state.prevAsset === "res") {
        tempArray[4] = 1;
      }
    }

    if (this.props.prevAsset !== "") {
      if (this.props.prevAsset === "hp") {
        tempArray[0] = 2;
      }
      if (this.props.prevAsset === "atk") {
        tempArray[1] = 2;
      }
      if (this.props.prevAsset === "spd") {
        tempArray[2] = 2;
      }
      if (this.props.prevAsset === "def") {
        tempArray[3] = 2;
      }
      if (this.props.prevAsset === "res") {
        tempArray[4] = 2;
      }
    }

    this.setState({
      prevAsset: e.value,
    });

    if (e.value === "hp") {
      if (tempArray[0] === 0) {
        tempArray[0] = 1;
      } else {
        tempArray[0] = 2;
      }
    }
    if (e.value === "atk") {
      if (tempArray[1] === 0) {
        tempArray[1] = 1;
      } else {
        tempArray[1] = 2;
      }
    }
    if (e.value === "spd") {
      if (tempArray[2] === 0) {
        tempArray[2] = 1;
      } else {
        tempArray[2] = 2;
      }
    }
    if (e.value === "def") {
      if (tempArray[3] === 0) {
        tempArray[3] = 1;
      } else {
        tempArray[3] = 2;
      }
    }
    if (e.value === "res") {
      if (tempArray[4] === 0) {
        tempArray[4] = 1;
      } else {
        tempArray[4] = 2;
      }
    }

    this.props.onChange(tempArray, e.value);
  }

  render(props) {
    const colorStyles = {
      control: (base, state) => ({
        ...base,
        background: "#daf5e5",
        // match with the menu
        borderRadius: 4,
        // Overwrittes the different states of border
        borderColor: "green",
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "green" : "blue",
        },
      }),
      option: (styles, { data, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isSelected ? "#deebff" : data.color,
          color: "black",
          "&:hover": {
            // Overwrittes the different states of border
            backgroundColor: "#deebff",
          },
        };
      },
    };
    let statsOptions = [
      { value: "", label: "Neutral" },
      {
        value: "hp",
        label: "+Hp",
        color: `${this.props.levels.superboon[0]}`,
      },
      {
        value: "atk",
        label: "+Atk",
        color: `${this.props.levels.superboon[1]}`,
      },
      {
        value: "spd",
        label: "+Spd",
        color: `${this.props.levels.superboon[2]}`,
      },
      {
        value: "def",
        label: "+Def",
        color: `${this.props.levels.superboon[3]}`,
      },
      {
        value: "res",
        label: "+Res",
        color: `${this.props.levels.superboon[4]}`,
      },
    ];
    return (
      <div>
        <Select
          name="ascended"
          value={this.props.prevAsset}
          onChange={this.handleAscended}
          isDisabled={!this.props.hero.exists}
          options={statsOptions}
          styles={colorStyles}
        />
      </div>
    );
  }
}

export default AscendedComponent;
