import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Row } from "react-bootstrap";

//redux imports
import { useSelector } from "react-redux";

export default function WeaponComponent(props) {
  // lists that contain the info from the fetch call in HeroComponent in dropdown format
  const [weaponList, setWeaponList] = useState([]);

  // list that contains the dropdown information for the selected weapon refine
  const [selectedWeaponRefines, setSelectedWeaponRefines] = useState([]);

  // variable that fills in the dropdown
  const [weapon, setWeapon] = useState(null);
  const [refine, setRefine] = useState(null);

  // disabling/loading constants for both dropdowns
  const [isLoading, setIsLoading] = useState(true);

  const emptyWeapon = {
    name: "",
    might: 0,
    visibleStats: [0, 0, 0, 0, 0],
    refine: false,
    rearmed: false,
  };

  useEffect(() => {
    setIsLoading(true);
    setWeaponList(
      []
        .concat(props.weapons)
        .filter((e) => e.maxSkill === "TRUE")
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
  }, [props.weapons]);

  useEffect(() => {
    console.log(props.stringWeapon);
    if (props.stringWeapon.weapon !== "" && typeof props.stringWeapon.weapon === "string") {
      var tempWeapon = props.weapons.find((e) => e.name === props.stringWeapon.weapon);
      handleWeapon(null, { label: tempWeapon.name, value: tempWeapon, color: "white" });
      if (tempWeapon.refine === "TRUE" && props.stringWeapon.refine !== "") {
        var tempRefine = null;
        if (props.stringWeapon.refine === "Effect" && tempWeapon.uniqueRefine.length === 5) {
          tempRefine = { value: tempWeapon.uniqueRefine, label: "Effect" };
        } else if (props.stringWeapon.refine === "+Atk") {
          tempRefine = { value: [tempWeapon.genericRefine[0], tempWeapon.genericRefine[1], 0, 0, 0], label: "+Atk" };
        } else if (props.stringWeapon.refine === "+Spd") {
          tempRefine = { value: [tempWeapon.genericRefine[0], 0, tempWeapon.genericRefine[2], 0, 0], label: "+Spd" };
        } else if (props.stringWeapon.refine === "+Def") {
          tempRefine = { value: [tempWeapon.genericRefine[0], 0, 0, tempWeapon.genericRefine[3], 0], label: "+Def" };
        } else if (props.stringWeapon.refine === "+Res") {
          tempRefine = { value: [tempWeapon.genericRefine[0], 0, 0, 0, tempWeapon.genericRefine[4]], label: "+Res" };
        } else if (props.stringWeapon.refine === "Wrathful") {
          tempRefine = { value: [0, 0, 0, 0, 0], label: "Wrathful" };
        } else if (props.stringWeapon.refine === "Dazzling") {
          tempRefine = { value: [0, 0, 0, 0, 0], label: "Dazzling" };
        }
        setRefine(tempRefine);
        props.onChangeR(tempRefine, props.stringWeapon.weapon);
      }
    } else if (typeof props.stringWeapon.weapon === "object") {
      setWeapon({ label: props.stringWeapon.weapon.name, value: props.stringWeapon.weapon });
      if (typeof props.stringWeapon.refine === "object") {
        setRefine({ label: props.stringWeapon.refine.name, value: props.stringWeapon.refine });
      }
    } else if (props.stringWeapon.weapon === "") {
      handleWeapon(null, null);
    }
  }, [props.stringWeapon]);

  const setRefineDropdown = (unique, generic) => {
    var genericRefineList;
    if (generic.length !== 5) {
      genericRefineList = [];
    } else if (props.hero.weapon_type.includes("Staff")) {
      genericRefineList = [
        { value: [0, 0, 0, 0, 0], label: "Wrathful" },
        { value: [0, 0, 0, 0, 0], label: "Dazzling" },
      ];
    } else {
      genericRefineList = [
        { value: [generic[0], generic[1], 0, 0, 0], label: "+Atk" },
        { value: [generic[0], 0, generic[2], 0, 0], label: "+Spd" },
        { value: [generic[0], 0, 0, generic[3], 0], label: "+Def" },
        { value: [generic[0], 0, 0, 0, generic[4]], label: "+Res" },
      ];
    }
    if (unique.length === 1) {
      setSelectedWeaponRefines(genericRefineList);
    } else {
      const uniqueEffect = [{ value: unique, label: "Effect" }];
      setSelectedWeaponRefines(uniqueEffect.concat(genericRefineList));
    }
  };

  const handleWeapon = (event, value) => {
    if (value === null) {
      setSelectedWeaponRefines([]);
      setWeapon(null);
      props.onChangeW(emptyWeapon);
    } else {
      if (value.value.refine === "TRUE") {
        setRefineDropdown(value.value.uniqueRefine, value.value.genericRefine);
      }
      setWeapon(value);
      props.onChangeW(value.value);
    }
    setRefine(null);
    props.onChangeR(null, null);
  };

  const handleRefine = (event, value) => {
    setRefine(value);
    props.onChangeR(value, weapon.value.name);
  };

  return (
    <Row>
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
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder={"Weapon"}></TextField>}
        sx={{ width: 3 / 5 }}
      />
      <Autocomplete
        id="refine dropdown"
        options={selectedWeaponRefines}
        value={refine}
        onChange={handleRefine}
        disabled={weapon?.value.refine !== "TRUE"}
        getOptionLabel={(option) => option.label || ""}
        renderOption={(props: object, option: any) => <Box {...props}>{option.label}</Box>}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder={"Refine"}></TextField>}
        sx={{ width: 2 / 5 }}
      />
    </Row>
  );
}
