import React from "react";
import Select from "react-select";

class FlowerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowerCount: "",
    };
    this.handleDragonflowers = this.handleDragonflowers.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.hero.name !== nextProps.hero.name) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    // update flower options here
    this.setState({
      flowerCount: null,
    });
  }

  handleDragonflowers(e) {
    this.setState({
      flowerCount: e.value,
    });
    var tempArray = [0, 0, 0, 0, 0];
    var index = 0;
    while (index < e.value) {
      tempArray[index % 5] += 1;
      index++;
    }
    this.props.onChange(tempArray);
  }

  render(props) {
    const colorStyles = {
      control: (base, state) => ({
        ...base,
        background: "purple",
        // match with the menu
        borderRadius: 4,
        // Overwrittes the different states of border
        borderColor: "purple",
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "purple" : "blue",
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
    let flowerOptions = [
      { value: 0, label: "+0" },
      { value: 1, label: "+1" },
      { value: 2, label: "+2" },
      { value: 3, label: "+3" },
      { value: 4, label: "+4" },
      { value: 5, label: "+5" },
      { value: 6, label: "+6" },
      { value: 7, label: "+7" },
      { value: 8, label: "+8" },
      { value: 9, label: "+9" },
      { value: 10, label: "+10" },
      { value: 11, label: "+11" },
      { value: 12, label: "+12" },
      { value: 13, label: "+13" },
      { value: 14, label: "+14" },
      { value: 15, label: "+15" },
      { value: 16, label: "+16" },
      { value: 17, label: "+17" },
      { value: 18, label: "+18" },
      { value: 19, label: "+19" },
      { value: 20, label: "+20" },
    ];

    return (
      <div>
        <Select
          name="flower"
          value={this.state.flowerCount}
          onChange={this.handleDragonflowers}
          isDisabled={!this.props.hero.exists}
          options={flowerOptions}
          styles={colorStyles}
        />
      </div>
    );
  }
}

export default FlowerComponent;
