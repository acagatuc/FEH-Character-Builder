import React, { useState, useEffect } from "react";
import { Autocomplete, MenuItem, TextField } from "@mui/material";

export default function Dropdown(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(props.url);
      response = await response.json();
      setList(
        []
          .concat(response)
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(function (listItem) {
            return {
              value: listItem,
            };
          })
      );
      setIsLoading(false);
    }
    fetchMyAPI();
  }, []);

  const handleChange = (event, value) => {
    setHero(value);
    props.onChange(value);
  };

  return (
    <div>
      <Autocomplete
        id="hero list"
        autoSelect={true}
        disableClearable
        options={list}
        value={hero}
        onChange={handleChange}
        loading={isLoading}
        getOptionLabel={(option) => option.value.name || ""}
        isOptionEqualToValue={(option, option2) => option.value.name === option2.value.name}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Hero List"></TextField>
        )}
      />
    </div>
  );
}
