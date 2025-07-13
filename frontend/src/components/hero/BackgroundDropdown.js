import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";

export default function BackgroundDropdown(props) {
  // load these in from a database with a database call (later)
  const backgroundList = [
    { value: "study", label: "Study" },
    { value: "beach", label: "Beach" },
    { value: "newyear", label: "New Years" },
    { value: "halloween", label: "Halloween" },
  ];
  // const reduxBg = useSelector((state) => state.tabList.tabList[props.id].background);
  const [bg, setBg] = useState("");

  // useEffect(() => {
  //   setBg(reduxBg);
  // }, [reduxBg]);

  const handleBackgroundChange = (value) => {
    if (value === null) {
      props.onChange({ value: "normal", label: "" });
    } else {
      props.onChange(value);
    }
  };
  return (
    <div style={{ width: "90%", marginTop: "20px" }}>
      <Autocomplete
        id="background dropdown"
        options={backgroundList}
        value={bg}
        onChange={(_, value) => handleBackgroundChange(value)}
        disabled={props.disabled}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props, option) => <Box {...props}>{option.label}</Box>}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>}
      />
    </div>
  );
}
