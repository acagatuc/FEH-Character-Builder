import React from "react";
import Select from "react-select";

class FlawComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevFlaw: "",
    };
    this.handleFlaw = this.handleFlaw.bind(this);
  }

  handleFlaw(e) {
    var tempArray = this.props.value.array;
    var prev = "";
    if (this.state.prevFlaw !== "") {
      if (this.state.prevFlaw === "hp") {
        tempArray[0] = 1;
      }
      if (this.state.prevFlaw === "atk") {
        tempArray[1] = 1;
      }
      if (this.state.prevFlaw === "spd") {
        tempArray[2] = 1;
      }
      if (this.state.prevFlaw === "def") {
        tempArray[3] = 1;
      }
      if (this.state.prevFlaw === "res") {
        tempArray[4] = 1;
      }
    }
    this.setState({
      prevFlaw: e.value,
    });

    if (e.value === "hp") {
      tempArray[0] = 0;
      prev = "hp";
    }
    if (e.value === "atk") {
      tempArray[1] = 0;
      prev = "atk";
    }
    if (e.value === "spd") {
      tempArray[2] = 0;
      prev = "spd";
    }
    if (e.value === "def") {
      tempArray[3] = 0;
      prev = "def";
    }
    if (e.value === "res") {
      tempArray[4] = 0;
      prev = "res";
    }
    this.props.onChange(tempArray, prev);
  }

  render(props) {
    const colorStyles = {
      control: (base, state) => ({
        ...base,
        background: "#ffc2c2",
        // match with the menu
        borderRadius: 4,
        // Overwrittes the different states of border
        borderColor: "red",
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "red" : "blue",
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
      {
        value: "",
        label: "Neutral",
      },
      {
        value: "hp",
        label: "-Hp",
        color: `${this.props.value.superbane[0]}`,
      },
      {
        value: "atk",
        label: "-Atk",
        color: `${this.props.value.superbane[1]}`,
      },
      {
        value: "spd",
        label: "-Spd",
        color: `${this.props.value.superbane[2]}`,
      },
      {
        value: "def",
        label: "-Def",
        color: `${this.props.value.superbane[3]}`,
      },
      {
        value: "res",
        label: "-Res",
        color: `${this.props.value.superbane[4]}`,
      },
    ];
    return (
      <div>
        <Select
          name="flaw"
          value={this.props.value.prevFlaw}
          onChange={this.handleFlaw}
          options={statsOptions}
          isDisabled={!this.props.hero.exists}
          styles={colorStyles}
        />
      </div>
    );
  }
}

export default FlawComponent;
