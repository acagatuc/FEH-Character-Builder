import React, { useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function BackgroundDropdown(props) {
  const backgroundList = [
    { value: "normal", label: "Normal" },
    { value: "study", label: "Study" },
    { value: "beach", label: "Beach" },
  ];
  const [bg, setBg] = useState("");

  const handleBackgroundChange = (event, value) => {
    props.onChange(value.value);
    setBg(value);
  };
  return (
    <div>
      <Autocomplete
        id="background dropdown"
        disableClearable
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
