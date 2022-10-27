import React, { useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

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
  const [fav, setFav] = useState("");

  const handleFavoriteChange = (event, value) => {
    if (value === null) {
      props.onChange(0);
      setFav("");
    } else {
      props.onChange(value.value);
      setFav(value);
    }
  };
  return (
    <div>
      <Autocomplete
        id="favorite dropdown"
        options={favoriteList}
        value={fav}
        onChange={handleFavoriteChange}
        disabled={!props.hero.exists}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props: object, option: any) => <Box {...props}>{option.label}</Box>}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>}
      />
    </div>
  );
}
