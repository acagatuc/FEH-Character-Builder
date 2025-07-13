import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./HeroComponent.css";

export default function ToggleComponent(props) {
  const [selected, setSelected] = useState("No");

  useEffect(() => {
    setSelected(props.currentState);
  }, [props.currentState]);

  const handleChange = (value) => {
    if (value !== null) {
      props.onChange(value);
    }
  };
  return (
    <div className="support">
      <label>{props.label} </label>
      <ToggleButtonGroup value={selected} onChange={(_, value) => handleChange(value)} exclusive color="warning" disabled={props.disabled}>
        <ToggleButton value="No">No</ToggleButton>
        <ToggleButton value="C">C</ToggleButton>
        <ToggleButton value="B">B</ToggleButton>
        <ToggleButton value="A">A</ToggleButton>
        <ToggleButton value="S">S</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
