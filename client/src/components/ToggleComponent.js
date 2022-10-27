import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleComponent(props) {
  const [selected, setSelected] = useState("No");
  const handleChange = (e, value) => {
    if (value !== null) {
      setSelected(value);
      props.onChange(value);
    }
  };
  return (
    <div>
      <label>{props.label} </label>
      <br />
      <ToggleButtonGroup value={selected} onChange={handleChange} exclusive color="warning" disabled={!props.exists}>
        <ToggleButton value="No">No</ToggleButton>
        <ToggleButton value="C">C</ToggleButton>
        <ToggleButton value="B">B</ToggleButton>
        <ToggleButton value="A">A</ToggleButton>
        <ToggleButton value="S">S</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
