import React from "react";
import Select from "react-select";

class MergeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMergeOption: "",
      merges: 0,
      disabled: false,
    };
    this.findMergeOrder = this.findMergeOrder.bind(this);
  }

  findMergeOrder(e) {
    this.setState({ selectedMergeOption: e });
    var tempArray = [];
    var mergeTemp = [];

    tempArray.push(0);
    tempArray.push(this.props.value.hero.atk[this.props.value.levels.array[1]]);
    tempArray.push(this.props.value.hero.spd[this.props.value.levels.array[2]]);
    tempArray.push(this.props.value.hero.def[this.props.value.levels.array[3]]);
    tempArray.push(this.props.value.hero.res[this.props.value.levels.array[4]]);

    mergeTemp.push(0);
    var i = 0;
    while (i < 4) {
      var index = tempArray.indexOf(Math.max(...tempArray));
      mergeTemp.push(index);
      tempArray[index] = 0;
      i += 1;
    }
    this.props.onChange(e.value, mergeTemp);
  }

  render(props) {
    let mergeOptions = [
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
    ];
    return (
      <div>
        <Select
          name="merges"
          onChange={this.findMergeOrder}
          isDisabled={!this.props.hero.exists}
          options={mergeOptions}
        />
      </div>
    );
  }
}

export default MergeComponent;
