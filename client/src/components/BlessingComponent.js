import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function SkillComponent(props) {
  const [blessing, setBlessing] = useState(null);
  const blessingOptions = [
    { value: "water", label: "Water" },
    { value: "wind", label: "Wind" },
    { value: "fire", label: "Fire" },
    { value: "earth", label: "Earth" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "astra", label: "Astra" },
    { value: "anima", label: "Anima" },
  ];

  useEffect(() => {
    setBlessing(null);
  }, [props.hero.name]);

  const handleBlessing = (e, value) => {
    setBlessing(value);
    props.onChange(value);
  };

  return (
    <div>
      <Autocomplete
        id="blessing dropdown"
        disableClearable
        options={blessingOptions}
        value={blessing}
        onChange={handleBlessing}
        disabled={!props.hero.exists || props.hero.hero_type !== "normal"}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props: object, option: any) => <Box {...props}>{option.label}</Box>}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => (
          <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>
        )}
      />
    </div>
  );
}
