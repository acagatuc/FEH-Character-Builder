import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

// redux import
import { useSelector } from "react-redux";

export default function SkillComponent(props) {
  const rearmed = useSelector((state) => state.tabList.tabList[props.id].weapon.rearmed);
  const [skillList, setSkillList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skill, setSkill] = useState(null);
  const emptySkill = {
    name: "",
    visibleStats: [0, 0, 0, 0, 0],
    unique: false,
  };

  useEffect(() => {
    async function fetchMyAPI() {
      var urlAddon = props.hero.move_type + "/" + props.hero.weapon_type + "/" + props.hero._id;
      let response = await fetch(props.url + urlAddon);
      response = await response.json();
      setSkillList(
        []
          .concat(response)
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(function (listItem) {
            var color;
            if (props.heroSkills.length === 0) {
              color = "white";
            } else if (props.heroSkills[props.heroSkills.length - 1].includes(listItem.name)) {
              color = "#daf5e5";
            } else if (props.heroSkills.includes(listItem.name) && props.heroSkills[props.heroSkills.indexOf(listItem.name) + 1].includes("1")) {
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
      setIsLoading(false);
      if (props.url.includes("Assist")) {
        props.onLoad(0);
      } else if (props.url.includes("Special")) {
        props.onLoad(1);
      } else if (props.url.includes("A_Slot")) {
        props.onLoad(2);
      } else if (props.url.includes("B_Slot")) {
        props.onLoad(3);
      } else if (props.url.includes("C_Slot")) {
        props.onLoad(4);
      }
    }
    if (props.hero.exists) {
      setSkill(null);
      fetchMyAPI();
    }
  }, [props.hero.name]);

  useEffect(() => {
    if (skill !== null && rearmed === "TRUE") {
      if (skill.value.unique) {
        setSkill(null);
        props.onChange(emptySkill);
      }
    }
  }, [rearmed]);

  useEffect(() => {
    if (typeof props.skill === "string") {
      var temp = skillList.find((e) => e.label === props.skill);
      if (temp !== undefined) {
        props.onChange(temp.value);
      }
    } else {
      setSkill({ value: props.skill, label: props.skill.name });
    }
  }, [props.skill]);

  const handleChange = (event, value) => {
    if (value === null) {
      props.onChange(emptySkill);
    } else {
      props.onChange(value.value);
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
        getOptionDisabled={(option) => option.value.unique === "TRUE" && rearmed === "TRUE"}
        renderOption={(props: object, option: any) => (
          <Box sx={{ backgroundColor: option.color }} {...props}>
            {option.label}
          </Box>
        )}
        isOptionEqualToValue={(option, option2) => option.value === option2.value}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>}
      />
    </div>
  );
}
