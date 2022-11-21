import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function BlessingComponent(props) {
  const [blessing, setBlessing] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
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
    if (
      props.hero.hero_type === "normal" ||
      props.hero.hero_type === "duo" ||
      props.hero.hero_type === "harmonic" ||
      props.hero.hero_type === "rearmed" ||
      props.hero.hero_type === "ascended"
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [props.hero.name, props.hero.hero_type]);

  const handleBlessing = (e, value) => {
    setBlessing(value);
    props.onChange(value);
  };

  return (
    <div>
      <Autocomplete
        id="blessing dropdown"
        options={blessingOptions}
        value={blessing}
        onChange={handleBlessing}
        disabled={!props.hero.exists || isDisabled}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props: object, option: any) => <Box {...props}>{option.label}</Box>}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>}
      />
    </div>
  );
}
