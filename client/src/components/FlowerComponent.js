import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function FlowerComponent(props) {
  const [flowers, setFlowers] = useState("");
  const [flowerList, setFlowerList] = useState([]);
  const options = [
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
    { value: 11, label: "+11" },
    { value: 12, label: "+12" },
    { value: 13, label: "+13" },
    { value: 14, label: "+14" },
    { value: 15, label: "+15" },
    { value: 16, label: "+16" },
    { value: 17, label: "+17" },
    { value: 18, label: "+18" },
    { value: 19, label: "+19" },
    { value: 20, label: "+20" },
    { value: 21, label: "+21" },
    { value: 22, label: "+22" },
    { value: 23, label: "+23" },
    { value: 24, label: "+24" },
    { value: 25, label: "+25" },
  ];

  useEffect(() => {
    var index = +props.hero.dragonflowers + 1;
    setFlowerList(options.slice(0, index));
  }, [props.hero]);

  const handleDragonflowers = (event, value) => {
    var tempArray = [0, 0, 0, 0, 0];
    if (value !== null) {
      var index = 0;
      while (index < value.value) {
        tempArray[index % 5] += 1;
        index++;
      }
    }
    setFlowers(value);
    props.onChange(tempArray);
  };

  return (
    <div>
      <Autocomplete
        id="flower dropdown"
        options={flowerList}
        value={flowers}
        onChange={handleDragonflowers}
        disabled={!props.hero.exists}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props: object, option: any) => (
          <Box sx={{ backgroundColor: option.color }} {...props}>
            {option.label}
          </Box>
        )}
        isOptionEqualToValue={(option, value) => option.label === value.label || ""}
        renderInput={(params) => (
          <TextField {...params} variant="standard" placeholder="Dragonflowers"></TextField>
        )}
      />
    </div>
  );
}
