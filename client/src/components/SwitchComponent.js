import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@mui/material";

export default function SwitchComponent(props) {
  const handleChange = (e, value) => {
    props.onChange(value);
  };
  return (
    <FormControlLabel
      control={<Switch checked={props.res} onChange={handleChange} />}
      label={props.label}
      labelPlacement="start"
    />
  );
}
