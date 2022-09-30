import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function Merges(props) {
  const [merges, setMerges] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  let mergeOptions = [
    { value: 0, label: "+0" },
    { value: 1, label: "+1" },
    { value: 2, label: "+2" },
    { value: 3, label: "+3" },
    { value: 4, label: "+4" },
    { value: 5, label: "+5" },
    { value: 6, label: "+6" },
    { value: 7, label: "+7" },
    { value: 8, label: "+8" },
    { value: 9, label: "+9" },
    { value: 10, label: "+10" },
  ];

  useEffect(() => {
    setMerges(null);
    setIsDisabled(false);
    props.onChange(0, [0, 0, 0, 0, 0]);
  }, [props.hero.name]);

  const handleChange = (event, value) => {
    setMerges(value);
    if (value !== null) {
      var tempArray = [];
      var mergeTemp = [];

      tempArray.push(0);
      tempArray.push(parseInt(props.hero.atk[props.levels.array[1]]));
      tempArray.push(parseInt(props.hero.spd[props.levels.array[2]]));
      tempArray.push(parseInt(props.hero.def[props.levels.array[3]]));
      tempArray.push(parseInt(props.hero.res[props.levels.array[4]]));

      mergeTemp.push(0);
      var i = 0;
      while (i < 4) {
        var index = tempArray.indexOf(Math.max(...tempArray));
        mergeTemp.push(index);
        tempArray[index] = 0;
        i += 1;
      }
      props.onChange(value.value, mergeTemp);
    } else {
      props.onChange(0, [0, 0, 0, 0, 0]);
    }
  };

  return (
    <div>
      <Autocomplete
        id="merge dropdown"
        options={mergeOptions}
        value={merges}
        onChange={handleChange}
        disabled={isDisabled}
        getOptionLabel={(option) => option.label || null}
        renderOption={(props: object, option: any) => (
          <Box sx={{ backgroundColor: option.color }} {...props}>
            {option.label}
          </Box>
        )}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label={props.placeholder}></TextField>
        )}
      />
    </div>
  );
}
