import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function SkillComponent(props) {
  const [skillList, setSkillList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skill, setSkill] = useState(null);
  const emptySkill = {
    value: {
      name: "",
      img: null,
      visibleStats: "",
      unique: false,
    },
  };

  useEffect(() => {
    async function fetchMyAPI() {
      var urlAddon = props.hero.move_type + "/" + props.hero.weapon_type + "/" + props.hero.name;
      let response = await fetch(props.url + urlAddon);
      response = await response.json();
      if (props.url.includes("Assist")) {
        setSkillList(
          []
            .concat(response)
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map(function (listItem) {
              var color;
              if (props.hero.assists.includes(listItem.name)) {
                color = "#daf5e5";
              } else {
                color = "white";
              }
              return {
                value: listItem,
                label: listItem.name,
                color: color,
              };
            })
        );
      } else if (props.url.includes("Special")) {
        setSkillList(
          []
            .concat(response)
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map(function (listItem) {
              var color;
              if (props.hero.specials.includes(listItem.name)) {
                color = "#daf5e5";
              } else {
                color = "white";
              }
              return {
                value: listItem,
                label: listItem.name,
                color: color,
              };
            })
        );
      } else {
        setSkillList(
          []
            .concat(response)
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map(function (listItem) {
              var color;
              if (props.hero.passives.includes(listItem.name)) {
                color = "#daf5e5";
              } else {
                color = "white";
              }
              return {
                value: listItem,
                label: listItem.name,
                color: color,
              };
            })
        );
      }

      setIsLoading(false);
    }
    if (props.hero.exists) {
      setSkill(null);
      fetchMyAPI();
    }
  }, [props.hero.name]);

  const handleChange = (event, value) => {
    setSkill(value);
    if (value === null) {
      props.onChange(emptySkill);
    } else {
      props.onChange(value);
    }
  };

  return (
    <div>
      <Autocomplete
        id="skill dropdown"
        options={skillList}
        value={skill}
        onChange={handleChange}
        loading={isLoading}
        disabled={!props.hero.exists}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props: object, option: any) => (
          <Box sx={{ backgroundColor: option.color }} {...props}>
            {option.label}
          </Box>
        )}
        isOptionEqualToValue={(option, option2) => option.value.name === option2.value.name}
        renderInput={(params) => (
          <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>
        )}
      />
    </div>
  );
}
