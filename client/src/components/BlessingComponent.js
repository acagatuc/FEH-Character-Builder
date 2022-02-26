import React from "react";
import Select from "react-select";

class BlessingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blessing: "",
    };
    this.handleBlessing = this.handleBlessing.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.name !== nextProps.name) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    // update flower options here
    this.setState({
      blessing: null,
    });
  }

  handleBlessing(e) {
    this.setState({
      blessing: e,
    });
    this.props.onChange(e);
    this.forceUpdate();
  }

  render(props) {
    const colorStyles = {
      control: (base, state) => ({
        ...base,
        background: "#e18bf0",
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
    let blessingOptions = [
      { value: "water", label: "Water" },
      { value: "wind", label: "Wind" },
      { value: "fire", label: "Fire" },
      { value: "earth", label: "Earth" },
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "astra", label: "Astra" },
      { value: "anima", label: "Anima" },
    ];

    return (
      <div>
        <Select
          name="Blessing"
          value={this.state.blessing}
          onChange={this.handleBlessing}
          isDisabled={!this.props.exists}
          options={blessingOptions}
          styles={colorStyles}
        />
      </div>
    );
  }
}

export default BlessingComponent;
