import React, { useState, useEffect, useContext } from "react";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { DisplayContext } from "../DisplayContext.js";

export default function Dropdown(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hero, setHero] = useState(null);
  const [heroName, setHeroName] = useState("");
  const context = useContext(DisplayContext);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(props.url);
      response = await response.json();
      if (context.display === "full") {
        setList(
          []
            .concat(response)
            .sort((a, b) => (a.full_name > b.full_name ? 1 : -1))
            .map(function (listItem) {
              var fullName;
              if (context.grima && listItem.full_name.includes("Fallen Robin")) {
                fullName = listItem.full_name.replace("Fallen Robin", "Grima");
              } else {
                fullName = listItem.full_name;
              }
              if (context.backpack && listItem.backpack !== null) {
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
      } else if (context.display === "title") {
        setList(
          []
            .concat(response)
            .sort((a, b) => (a.name_title > b.name_title ? 1 : -1))
            .map(function (listItem) {
              if (context.backpack && listItem.backpack !== null) {
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
      } else if (context.display === "abbrev") {
        setList(
          []
            .concat(response)
            .sort((a, b) => (a.abbreviated > b.abbreviated ? 1 : -1))
            .map(function (listItem) {
              var abbr = "";
              if (context.grima && listItem.abbreviated.includes("F!M!Robin")) {
                abbr = listItem.abbreviated.replace("F!M!Robin", "M!Grima");
              } else if (context.grima && listItem.abbreviated.includes("F!F!Robin")) {
                abbr = listItem.abbreviated.replace("F!F!Robin", "F!Grima");
              } else {
                abbr = listItem.abbreviated;
              }
              if (context.backpack && listItem.backpack !== null) {
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
  }, [context.display, context.grima]);

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
