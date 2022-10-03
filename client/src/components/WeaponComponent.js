import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function WeaponComponent(props) {
  const [weaponList, setWeaponList] = useState([]);
  const [weapon, setWeapon] = useState("");
  const [refineList, setRefineList] = useState([]);
  const [refine, setRefine] = useState("");
  const [fetchRefine, setFetchRefine] = useState("");
  const genericRefineList = [
    { value: "atk_refine", label: "+Atk" },
    { value: "spd_refine", label: "+Spd" },
    { value: "def_refine", label: "+Def" },
    { value: "res_refine", label: "+Res" },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const emptyWeapon = {
    value: {
      name: "",
      might: 0,
      visibleStats: [0, 0, 0, 0, 0],
      refine: false,
    },
  };
  const [isDisabled, setIsDisabled] = useState(true);

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
            if (props.hero.weapons.includes(listItem.name)) {
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
    }
    var weapon_type = "";
    if (props.hero.exists) {
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
      if (weapon_type !== "") {
        setIsLoading(false);
        setWeapon(null);
        setRefine(null);
        fetchMyAPI();
        setIsDisabled(true);
      } else {
        setWeapon(emptyWeapon);
        setRefine(null);
        setIsDisabled(true);
      }
    }
  }, [props.hero.name]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`http://localhost:5000/Refines/` + weapon.label);
      response = await response.json();
      setFetchRefine(response);
      if (weapon.value.heroesList) {
        var list = [
          {
            value: "unique",
            label: "+Unique Effect: " + weapon.value.name,
          },
        ];
        setRefineList(list.concat(genericRefineList));
      } else {
        setRefineList(genericRefineList);
      }
    }

    if (weapon !== null && weapon !== "") {
      if (weapon.value.refine === "TRUE") {
        fetchMyAPI();
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
      setRefine(null);
    }
  }, [weapon]);

  const handleWeapon = (event, value) => {
    if (value === null) {
      props.onChangeW(emptyWeapon);
    } else {
      props.onChangeW(value);
    }
    setWeapon(value);
  };

  const handleRefine = (event, value) => {
    var refine = {
      stats: [0, 0, 0, 0, 0],
      img: "",
    };
    if (value === null) {
      props.onChangeR(refine);
    } else {
      if (value.value === "unique") {
        refine.stats = fetchRefine.uniqueRefine;
        refine.img = "https://fehskills.s3.amazonaws.com/" + weapon.value.name + ".png";
      } else if (value.value === "atk_refine") {
        refine.stats[0] = fetchRefine.genericRefine[0];
        refine.stats[1] = fetchRefine.genericRefine[1];
        refine.img = "https://fehskills.s3.amazonaws.com/" + value.value + ".png";
      } else if (value.value === "spd_refine") {
        refine.stats[0] = fetchRefine.genericRefine[0];
        refine.stats[2] = fetchRefine.genericRefine[2];
        refine.img = "https://fehskills.s3.amazonaws.com/" + value.value + ".png";
      } else if (value.value === "def_refine") {
        refine.stats[0] = fetchRefine.genericRefine[0];
        refine.stats[3] = fetchRefine.genericRefine[3];
        refine.img = "https://fehskills.s3.amazonaws.com/" + value.value + ".png";
      } else if (value.value === "res_refine") {
        refine.stats[0] = fetchRefine.genericRefine[0];
        refine.stats[4] = fetchRefine.genericRefine[4];
        refine.img = "https://fehskills.s3.amazonaws.com/" + value.value + ".png";
      }
      props.onChangeR(refine);
    }
    setRefine(value);
  };

  return (
    <div>
      <Autocomplete
        id="weapon dropdown"
        options={weaponList}
        value={weapon}
        onChange={handleWeapon}
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
          <TextField {...params} variant="standard" placeholder={"Weapon"}></TextField>
        )}
      />
      <Autocomplete
        id="refine dropdown"
        options={refineList}
        value={refine}
        onChange={handleRefine}
        disabled={isDisabled}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props: object, option: any) => <Box {...props}>{option.label}</Box>}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => (
          <TextField {...params} variant="standard" placeholder={"Refine"}></TextField>
        )}
      />
    </div>
  );
}
