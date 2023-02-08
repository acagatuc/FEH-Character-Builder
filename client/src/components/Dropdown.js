import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

// redux import
import { useSelector } from "react-redux";

export default function Dropdown(props) {
  // whole hero list that contains all names, backpacks, and character ids
  const heroList = useSelector((state) => state.display.heroList);

  // list of heroes only used for display (uses parts of the hero list to creat this)
  const hero = useSelector((state) => state.tabList.tabList[props.id].hero);
  const [dropdown, setDropdown] = useState({ value: null, label: "" });

  useEffect(() => {
    // change name based on current name display settings
    if (hero.name === "" || hero.name === undefined) {
      setDropdown({ label: "" });
    } else {
      var name = heroList.find((h) => h.value === hero._id);
      setDropdown({ value: hero, label: name.label });
    }
  }, [hero, heroList]);

  // gets the character and returns the object to the parent and sets the hero name equal to the label
  async function handleChange(event, value) {
    props.onChange(value.value);
  }

  return (
    <Autocomplete
      id="hero list"
      disableClearable
      openOnFocus
      selectOnFocus
      options={heroList}
      value={dropdown}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, option2) => option.value === option2.value}
      renderInput={(params) => <TextField {...params} variant="outlined" label="Hero List"></TextField>}
    />
  );
}
