import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function Traits(props) {
  const [trait, setTrait] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [traitOptions, setTraitOptions] = useState([
    {
      value: "hp",
      label: props.label + "Hp",
      color: "white",
    },
    {
      value: "atk",
      label: props.label + "Atk",
      color: "white",
    },
    {
      value: "spd",
      label: props.label + "Spd",
      color: "white",
    },
    {
      value: "def",
      label: props.label + "Def",
      color: "white",
    },
    {
      value: "res",
      label: props.label + "Res",
      color: "white",
    },
  ]);

  useEffect(() => {
    if (props.hero.name !== "") {
      setIsDisabled(false);
    }
    var tempArray = traitOptions;
    if (props.stats !== undefined) {
      if (props.stats.includes("hp")) {
        tempArray[0] = {
          value: "hp",
          label: props.label + "Hp",
          color: props.color,
        };
      }
      if (props.stats.includes("atk")) {
        tempArray[1] = {
          value: "atk",
          label: props.label + "Atk",
          color: props.color,
        };
      }
      if (props.stats.includes("spd")) {
        tempArray[2] = {
          value: "spd",
          label: props.label + "Spd",
          color: props.color,
        };
      }
      if (props.stats.includes("def")) {
        tempArray[3] = {
          value: "def",
          label: props.label + "Def",
          color: props.color,
        };
      }
      if (props.stats.includes("res")) {
        tempArray[4] = {
          value: "res",
          label: props.label + "Res",
          color: props.color,
        };
      }
    }
    setTraitOptions(tempArray);
    setTrait(null);
  }, [props.hero, props.color, props.label, props.stats, traitOptions]);

  const handleChange = (event, value) => {
    var tempArray = props.array;
    if (trait !== null && trait !== "") {
      if (trait.label === props.label + "Hp") {
        tempArray[0] = 1;
      } else if (trait.label === props.label + "Atk") {
        tempArray[1] = 1;
      } else if (trait.label === props.label + "Spd") {
        tempArray[2] = 1;
      } else if (trait.label === props.label + "Def") {
        tempArray[3] = 1;
      } else if (trait.label === props.label + "Res") {
        tempArray[4] = 1;
      }
    }

    if (value !== null) {
      var statLevel;
      if (props.label === "+") {
        statLevel = 2;
      } else {
        statLevel = 0;
      }

      if (value.value === "hp") {
        tempArray[0] = statLevel;
      } else if (value.value === "atk") {
        tempArray[1] = statLevel;
      } else if (value.value === "spd") {
        tempArray[2] = statLevel;
      } else if (value.value === "def") {
        tempArray[3] = statLevel;
      } else if (value.value === "res") {
        tempArray[4] = statLevel;
      }

      setTrait(value);
      props.onChange(tempArray, value.value);
    } else {
      setTrait(value);
      props.onChange(tempArray, "");
    }
  };

  return (
    <div>
      <Autocomplete
        id="trait dropdown"
        options={traitOptions}
        value={trait}
        onChange={handleChange}
        disabled={isDisabled}
        getOptionLabel={(option) => option.label || null}
        renderOption={(props: object, option: any) => (
          <Box sx={{ backgroundColor: option.color }} {...props}>
            {option.label}
          </Box>
        )}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>}
      />
    </div>
  );
}
