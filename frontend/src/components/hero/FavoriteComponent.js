import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";

export default function FavoriteComponent(props) {
  const favoriteList = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
  ];
  // const reduxFav = useSelector((state) => state.tabList.tabList[props.id].favorite);
  const [fav, setFav] = useState("");

  // useEffect(() => {
  //   setFav({ value: reduxFav, label: reduxFav.toString() });
  // }, [reduxFav]);

  const handleFavoriteChange = (value) => {
    if (value === null) {
      props.onChange(0);
    } else {
      props.onChange(value.value);
    }
  };
  return (
    <div style={{ width: "90%" }}>
      <Autocomplete
        id="favorite dropdown"
        options={favoriteList}
        value={fav}
        onChange={(_, value) => handleFavoriteChange(value)}
        disabled={!props.hero.exists}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props, option) => <Box {...props}>{option.label}</Box>}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>}
      />
    </div>
  );
}
