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
      console.log(context.display);
      let response = await fetch(props.url);
      response = await response.json();
      if (context.display === "full") {
        setList(
          []
            .concat(response)
            .sort((a, b) => (a.full_name > b.full_name ? 1 : -1))
            .map(function (listItem) {
              return {
                value: listItem,
                label: listItem.full_name,
              };
            })
        );
      } else if (context.display === "title") {
        setList(
          []
            .concat(response)
            .sort((a, b) => (a.name_title > b.name_title ? 1 : -1))
            .map(function (listItem) {
              return {
                value: listItem,
                label: listItem.name_title,
              };
            })
        );
      } else if (context.display === "abbrev") {
        setList(
          []
            .concat(response)
            .sort((a, b) => (a.abbreviated > b.abbreviated ? 1 : -1))
            .map(function (listItem) {
              return {
                value: listItem,
                label: listItem.abbreviated,
              };
            })
        );
      }

      setIsLoading(false);
    }

    fetchMyAPI();
  }, [context.display]);

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
        autoSelect={true}
        disableClearable
        openOnFocus
        selectOnFocus
        options={list}
        value={hero}
        onChange={handleChange}
        loading={isLoading}
        getOptionLabel={(option) => option.label || heroName}
        isOptionEqualToValue={(option, option2) => option.character_id === option2.character_id}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Hero List"></TextField>}
      />
    </div>
  );
}
