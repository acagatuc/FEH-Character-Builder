import React, { useState, useEffect, useContext } from "react";
import { Autocomplete, MenuItem, TextField } from "@mui/material";

// redux import
import { useSelector } from "react-redux";

export default function Dropdown(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hero, setHero] = useState(null);
  const [heroName, setHeroName] = useState("");
  const name_display = useSelector((state) => state.display.name_display);
  const grima_display = useSelector((state) => state.display.grima);
  const backpack_display = useSelector((state) => state.display.backpack);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(props.url);
      response = await response.json();
      if (name_display === "full") {
        setList(
          []
            .concat(response)
            .sort((a, b) => (a.full_name > b.full_name ? 1 : -1))
            .map(function (listItem) {
              var fullName;
              if (grima_display && listItem.full_name.includes("Fallen Robin")) {
                fullName = listItem.full_name.replace("Fallen Robin", "Grima");
              } else {
                fullName = listItem.full_name;
              }
              if (backpack_display && listItem.backpack !== null) {
                return {
                  value: listItem,
                  label: fullName + " (+ " + listItem.backpack + ")",
                };
              } else {
                return {
                  value: listItem,
                  label: fullName,
                };
              }
            })
        );
      } else if (name_display === "title") {
        setList(
          []
            .concat(response)
            .sort((a, b) => (a.name_title > b.name_title ? 1 : -1))
            .map(function (listItem) {
              if (backpack_display && listItem.backpack !== null) {
                return {
                  value: listItem,
                  label: listItem.name_title + " (+ " + listItem.backpack + ")",
                };
              } else {
                return {
                  value: listItem,
                  label: listItem.name_title,
                };
              }
            })
        );
      } else if (name_display === "abbrev") {
        setList(
          []
            .concat(response)
            .sort((a, b) => (a.abbreviated > b.abbreviated ? 1 : -1))
            .map(function (listItem) {
              var abbr = "";
              if (grima_display && listItem.abbreviated.includes("F!M!Robin")) {
                abbr = listItem.abbreviated.replace("F!M!Robin", "M!Grima");
              } else if (grima_display && listItem.abbreviated.includes("F!F!Robin")) {
                abbr = listItem.abbreviated.replace("F!F!Robin", "F!Grima");
              } else {
                abbr = listItem.abbreviated;
              }
              if (backpack_display && listItem.backpack !== null) {
                return {
                  value: listItem,
                  label: abbr + " (+ " + listItem.backpack + ")",
                };
              } else {
                return {
                  value: listItem,
                  label: abbr,
                };
              }
            })
        );
      }

      setIsLoading(false);
    }

    fetchMyAPI();
  }, [name_display, grima_display, backpack_display]);

  async function handleChange(event, value) {
    let response = await fetch(props.url + value.value.character_id);
    response = await response.json();
    setHero(value);
    props.onChange(response[0]);
  }

  return (
    <div>
      <Autocomplete
        id="hero list"
        disableClearable
        openOnFocus
        selectOnFocus
        options={list}
        value={hero}
        onChange={handleChange}
        loading={isLoading}
        getOptionLabel={(option) => option.label || heroName}
        isOptionEqualToValue={(option, option2) => option.label === option2.label}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Hero List"></TextField>}
      />
    </div>
  );
}
