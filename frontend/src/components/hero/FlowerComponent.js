import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

// redux import
import { useSelector } from "react-redux";

export default function FlowerComponent(props) {
  // const dragonflowers = useSelector((state) => state.tabList.tabList[props.id].dragonflowers);
  // this will need to be changed later to a hero by hero basis
  const maxDragonflowers = useState([...new Array(11)].map((_, i) => i));
  const [dragonflowerSelector, setDragonflowerSelector] = useState(null);
  const [flowerList, setFlowerList] = useState([]);

  useEffect(() => {
    if (!props.disabled) {
      setFlowerList(
        maxDragonflowers[0].map((element) => {
          return { value: element, label: "+" + element };
        })
      );
    }
  }, [props.hero]);

  // useEffect(() => {
  //   if (dragonflowers === 0) {
  //     setDragonflowerSelector(null);
  //   } else {
  //     setDragonflowerSelector({
  //       value: dragonflowers,
  //       label: "+" + dragonflowers,
  //     });
  //   }
  // }, [dragonflowers]);

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
      disabled={props.disabled}
      getOptionLabel={(option) => option.label || ""}
      renderOption={(props, option) => (
        <Box sx={{ backgroundColor: option.color }} {...props}>
          {option.label}
        </Box>
      )}
      isOptionEqualToValue={(option, value) =>
        option.label === value.label || ""
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder="Dragonflowers"
        ></TextField>
      )}
    />
  );
}
