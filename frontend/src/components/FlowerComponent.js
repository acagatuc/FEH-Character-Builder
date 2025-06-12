import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

// redux import
import { useSelector } from "react-redux";

export default function FlowerComponent(props) {
  const dragonflowers = useSelector((state) => state.tabList.tabList[props.id].dragonflowers);
  const [dragonflowerSelector, setDragonflowerSelector] = useState(null);
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

  useEffect(() => {
    if (dragonflowers === 0) {
      setDragonflowerSelector(null);
    } else {
      setDragonflowerSelector({ value: dragonflowers, label: "+" + dragonflowers });
    }
  }, [dragonflowers]);

  const handleDragonflowers = (event, value) => {
    if (value !== null) {
      props.onChange(value.value);
    } else {
      props.onChange(0);
    }
  };

  return (
    <Autocomplete
      id="flower dropdown"
      sx={{ width: "48%" }}
      options={flowerList}
      value={dragonflowerSelector}
      onChange={handleDragonflowers}
      disabled={!props.hero.exists}
      getOptionLabel={(option) => option.label || ""}
      renderOption={(props: object, option: any) => (
        <Box sx={{ backgroundColor: option.color }} {...props}>
          {option.label}
        </Box>
      )}
      isOptionEqualToValue={(option, value) => option.label === value.label || ""}
      renderInput={(params) => <TextField {...params} variant="standard" placeholder="Dragonflowers"></TextField>}
    />
  );
}
