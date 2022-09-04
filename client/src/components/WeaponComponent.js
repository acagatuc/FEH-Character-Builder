import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function WeaponComponent(props) {
  const [weaponList, setWeaponList] = useState([]);
  const [weapon, setWeapon] = useState("");
  const [refineList, setRefineList] = useState([]);
  const [refine, setRefine] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const emptyWeapon = {
    value: {
      name: "",
      might: 0,
      visibleStats: "0, 0, 0, 0, 0",
      refine: false,
    },
  };

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        `http://localhost:5000/GenericWeapons/` + weapon_type + "/" + props.hero.name
      );
      response = await response.json();
      setWeaponList(
        []
          .concat(response)
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(function (listItem) {
            var color;
            if (props.hero.heroSkills.weapon.includes(listItem.name)) {
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
    var weapon_type;
    if (props.hero.weapon_type.includes("Beast") || props.hero.weapon_type.includes("Dragon")) {
      weapon_type = props.hero.weapon_type.split(" ")[1];
    } else if (
      props.hero.weapon_type.includes("Dagger") ||
      props.hero.weapon_type.includes("Bow")
    ) {
      weapon_type = props.hero.weapon_type.split(" ")[1] + "s";
    } else {
      weapon_type = props.hero.weapon_type;
    }

    setIsLoading(false);

    if (props.hero.exists) {
      setWeapon(null);
      fetchMyAPI();
    }
  }, [props.hero.name]);

  const handleChange = (event, value) => {
    if (value === null) {
      props.onChangeW(emptyWeapon);
    } else {
      props.onChangeW(value);
    }
    setWeapon(value);
  };

  return (
    <div>
      <Autocomplete
        id="weapon dropdown"
        options={weaponList}
        value={weapon}
        onChange={handleChange}
        loading={isLoading}
        disabled={!props.hero.exists}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props: object, option: any) => (
          <Box sx={{ backgroundColor: option.color }} {...props}>
            {option.value.name}
          </Box>
        )}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => (
          <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>
        )}
      />
    </div>
  );
}
