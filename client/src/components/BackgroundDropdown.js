import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";

export default function BackgroundDropdown(props) {
  const backgroundList = [
    { value: "study", label: "Study" },
    { value: "beach", label: "Beach" },
  ];
  const reduxBg = useSelector((state) => state.tabList.tabList[props.id].background);
  const [bg, setBg] = useState("");

  useEffect(() => {
    setBg(reduxBg);
  }, [reduxBg]);

  const handleBackgroundChange = (event, value) => {
    if (value === null) {
      props.onChange({ value: "normal", label: "" });
    } else {
      props.onChange(value);
    }
  };
  return (
    <div>
      <Autocomplete
        id="background dropdown"
        options={backgroundList}
        value={bg}
        onChange={handleBackgroundChange}
        disabled={!props.hero.exists}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props: object, option: any) => <Box {...props}>{option.label}</Box>}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>}
      />
    </div>
  );
}
