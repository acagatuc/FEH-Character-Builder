import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

// redux import
import { useSelector } from "react-redux";

export default function SkillComponent(props) {
  const rearmed = useSelector((state) => state.tabList.tabList[props.id].weapon.rearmed);
  const [skillList, setSkillList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const emptySkill = {
    name: "",
    visibleStats: [0, 0, 0, 0, 0],
    unique: false,
  };
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    setSkillList(
      []
        .concat(props.skills)
        .filter((e) => e.maxSkill === "TRUE")
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
  }, [props.skills]);

  useEffect(() => {
    if (skill !== null && skill !== undefined && skill.name !== "" && rearmed === "TRUE" && props.hero.hero_type !== "rearmed") {
      if (skill.value.unique) {
        setSkill(null);
        props.onChange(emptySkill);
      }
    }
  }, [rearmed]);

  // this useeffect should be used specifically to load builds from string skills and resetting tabs and nothing else
  useEffect(() => {
    if (props.skill === "") {
    } else if (props.skill === "reset") {
      handleChange(null, null);
    } else if (props.skill !== undefined && typeof props.skill === "string") {
      var tempSkill = props.skills.find((e) => e.name === props.skill);
      handleChange(null, { label: tempSkill.name, value: tempSkill, color: "white" });
    } else if (typeof props.skill === "object") {
      handleChange(null, { label: props.skill.name, value: props.skill });
    }
  }, [props.skill]);

  const handleChange = (event, value) => {
    if (value === null || value === undefined) {
      setSkill(null);
      props.onChange(emptySkill);
    } else {
      setSkill({ value: value.value, label: value.label });
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
        getOptionDisabled={(option) => option.value.unique && rearmed === "TRUE" && props.hero.hero_type !== "rearmed"}
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
