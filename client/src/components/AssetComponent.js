import React from "react";
import Select from "react-select";
import "./HeroCanvas.css";

class AssetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevAsset: "",
    };
    this.handleAsset = this.handleAsset.bind(this);
  }

  handleAsset(e) {
    var tempArray = this.props.value.array;
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
    this.setState({
      prevAsset: e.value,
    });

    if (e.value === "hp") {
      tempArray[0] = 2;
    }
    if (e.value === "atk") {
      tempArray[1] = 2;
    }
    if (e.value === "spd") {
      tempArray[2] = 2;
    }
    if (e.value === "def") {
      tempArray[3] = 2;
    }
    if (e.value === "res") {
      tempArray[4] = 2;
    }
    this.props.onChange(tempArray);
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
        color: `${this.props.value.superboon[0]}`,
      },
      {
        value: "atk",
        label: "+Atk",
        color: `${this.props.value.superboon[1]}`,
      },
      {
        value: "spd",
        label: "+Spd",
        color: `${this.props.value.superboon[2]}`,
      },
      {
        value: "def",
        label: "+Def",
        color: `${this.props.value.superboon[3]}`,
      },
      {
        value: "res",
        label: "+Res",
        color: `${this.props.value.superboon[4]}`,
      },
    ];
    return (
      <div>
        <Select
          name="asset"
          value={this.props.value.prevAsset}
          onChange={this.handleAsset}
          isDisabled={!this.props.hero.exists}
          options={statsOptions}
          styles={colorStyles}
        />
      </div>
    );
  }
}

export default AssetComponent;
