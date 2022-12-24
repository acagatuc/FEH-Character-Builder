import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleComponent(props) {
  const [selected, setSelected] = useState("No");

  useEffect(() => {
    setSelected(props.currentState);
  }, [props.currentState]);

  const handleChange = (e, value) => {
    if (value !== null) {
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
