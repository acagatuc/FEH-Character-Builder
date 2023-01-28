import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Row } from "react-bootstrap";

//redux imports
import { useSelector } from "react-redux";

export default function WeaponComponent(props) {
  // redux selectors to check for state changes
  const reduxWeapon = useSelector((state) => state.tabList.tabList[props.id].weapon);
  const reduxRefine = useSelector((state) => state.tabList.tabList[props.id].refine);

  // lists that contain the info from the fetch call in HeroComponent in dropdown format
  const [weaponList, setWeaponList] = useState([]);

  // list that contains the dropdown information for the selected weapon refine
  const [selectedWeaponRefines, setSelectedWeaponRefines] = useState([]);

  // variable that fills in the dropdown
  const [weapon, setWeapon] = useState(null);
  const [refine, setRefine] = useState(null);

  // disabling/loading constants for both dropdowns
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const emptyWeapon = {
    name: "",
    might: 0,
    visibleStats: [0, 0, 0, 0, 0],
    refine: false,
    rearmed: false,
  };

  useEffect(() => {
    if (props.stringWeapon.weapon !== "" && typeof props.stringWeapon.weapon === "string") {
      var tempWeapon = weaponList.find((e) => e.label === props.stringWeapon.weapon);
      handleWeapon(null, tempWeapon);
      if (tempWeapon.value.refine === "TRUE" && props.stringWeapon.refine !== "") {
        var tempRefine = null;
        if (props.stringWeapon.refine === "Effect" && tempWeapon.value.uniqueRefine.length !== 0) {
          tempRefine = { value: tempWeapon.value.uniqueRefine, label: "Effect" };
        } else if (props.stringWeapon.refine === "+Atk") {
          tempRefine = { value: [tempWeapon.value.genericRefine[0], tempWeapon.value.genericRefine[1], 0, 0, 0], label: "+Atk" };
        } else if (props.stringWeapon.refine === "+Spd") {
          tempRefine = { value: [tempWeapon.value.genericRefine[0], 0, tempWeapon.value.genericRefine[2], 0, 0], label: "+Spd" };
        } else if (props.stringWeapon.refine === "+Def") {
          tempRefine = { value: [tempWeapon.value.genericRefine[0], 0, 0, tempWeapon.value.genericRefine[3], 0], label: "+Def" };
        } else if (props.stringWeapon.refine === "+Res") {
          tempRefine = { value: [tempWeapon.value.genericRefine[0], 0, 0, 0, tempWeapon.value.genericRefine[4]], label: "+Res" };
        }
        setRefine(tempRefine);
        props.onChangeR(tempRefine, props.stringWeapon.weapon);
      }
    } else if (props.stringWeapon.weapon === "") {
      handleWeapon(null, null);
    }
  }, [props.stringWeapon]);

  useEffect(() => {
    setWeaponList(
      []
        .concat(props.weapons)
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
  }, [props.weapons]);

  const setRefineDropdown = (unique, generic) => {
    const genericRefineList = [
      { value: [generic[0], generic[1], 0, 0, 0], label: "+Atk" },
      { value: [generic[0], 0, generic[2], 0, 0], label: "+Spd" },
      { value: [generic[0], 0, 0, generic[3], 0], label: "+Def" },
      { value: [generic[0], 0, 0, 0, generic[4]], label: "+Res" },
    ];
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
