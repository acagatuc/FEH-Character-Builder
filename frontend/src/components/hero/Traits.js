import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";

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
    setTrait({ label: "" });
  }, [props.hero, props.color, props.label, props.stats, traitOptions]);

  useEffect(() => {
    if (props.stat !== undefined && props.stat !== null && props.stat !== "") {
      setTrait(traitOptions.find((e) => e.value === props.stat));
    } else {
      setTrait({ label: "" });
    }
  }, [props.stat]);

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

      props.onChange(tempArray, value.value);
    } else {
      props.onChange(tempArray, "");
    }
  };

  return (
    <Autocomplete
      id="trait dropdown"
      sx={{ width: "30%" }}
      options={traitOptions}
      value={trait}
      onChange={handleChange}
      disabled={isDisabled}
      getOptionLabel={(option) => option.label}
      renderOption={(props: object, option: any) => (
        <Box sx={{ backgroundColor: option.color }} {...props}>
          {option.label}
        </Box>
      )}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>}
    />
  );
}
