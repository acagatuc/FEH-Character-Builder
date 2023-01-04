import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

// redux import
import { useSelector } from "react-redux";

export default function Dropdown(props) {
  // whole hero list that contains all names, backpacks, and character ids
  const [heroList, setHeroList] = useState([]);

  // list of heroes only used for display (uses parts of the hero list to creat this)
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hero = useSelector((state) => state.tabList.tabList[props.id].hero);
  const [dropdown, setDropdown] = useState({ value: null, label: "" });

  // display settings that affect the list
  const name_display = useSelector((state) => state.display.name_display);
  const grima_display = useSelector((state) => state.display.grima);
  const backpack_display = useSelector((state) => state.display.backpack);

  // gets initial hero list with names and character ids
  useEffect(() => {
    async function fetchHeroList() {
      let response = await fetch("http://localhost:5000/Heroes/");
      response = await response.json();

      // concats hero list from response onto empty array and sets the hero list
      setHeroList(
        [].concat(response).map(function (listItem) {
          return {
            character_id: listItem.character_id,
            full_name: listItem.full_name,
            name_title: listItem.name_title,
            abbreviated: listItem.abbreviated,
            backpack: listItem.backpack,
          };
        })
      );
    }

    fetchHeroList();
  }, []);

  // creates a list with the given conditions outlined by the display state
  useEffect(() => {
    // creates a list of heroes from the display settings and the hero list
    function createList() {
      // if the user wants full names
      if (name_display === "full") {
        setList(
          []
            .concat(heroList)
            .sort((a, b) => (a.full_name > b.full_name ? 1 : -1))
            .map(function (listItem) {
              // if the user wants to display grima instead of fallen robin
              var name = listItem.full_name;
              if (grima_display && name.includes("Fallen Robin")) {
                name = name.replace("Fallen Robin", "Grima");
              }
              // if the user wants to display backpacks
              if (backpack_display && listItem.backpack !== null) {
                name = name + " (+" + listItem.backpack + ")";
              }
              // if the listItem is the currently selected hero, change the
              if (hero.name !== "") {
                if (listItem.character_id === dropdown.value._id) {
                  setDropdown({ ...dropdown, label: name });
                }
              }
              return {
                value: listItem.character_id,
                label: name,
              };
            })
        );
      }
      // if the user wants names and titles
      else if (name_display === "title") {
        setList(
          []
            .concat(heroList)
            .sort((a, b) => (a.name_title > b.name_title ? 1 : -1))
            .map(function (listItem) {
              // if the user wants to display grima instead of fallen robin
              var name = listItem.name_title;
              if (grima_display && name.includes("Fallen Robin")) {
                name = name.replace("Fallen Robin", "Grima");
              }
              // if the user wants to display backpacks
              if (backpack_display && listItem.backpack !== null) {
                name = name + " (+" + listItem.backpack + ")";
              }
              // if the listItem is the currently selected hero, change the
              if (hero.name !== "") {
                if (listItem.character_id === dropdown.value._id) {
                  setDropdown({ ...dropdown, label: name });
                }
              }
              return {
                value: listItem.character_id,
                label: name,
              };
            })
        );
      }
      // if the user wants abbreviated names
      else if (name_display === "abbrev") {
        setList(
          []
            .concat(heroList)
            .sort((a, b) => (a.abbreviated > b.abbreviated ? 1 : -1))
            .map(function (listItem) {
              // if the user wants to display grima instead of fallen robin
              var name = listItem.abbreviated;
              if (grima_display && name.includes("F!F!Robin")) {
                name = name.replace("F!F!Robin", "F!Grima");
              } else if (grima_display && name.includes("F!M!Robin")) {
                name = name.replace("F!M!Robin", "M!Grima");
              }
              // if the user wants to display backpacks
              if (backpack_display && listItem.backpack !== null) {
                name = name + " (+" + listItem.backpack + ")";
              }
              // if the listItem is the currently selected hero, change the
              if (hero.name !== "") {
                if (listItem.character_id === dropdown.value._id) {
                  setDropdown({ ...dropdown, label: name });
                }
              }
              return {
                value: listItem.character_id,
                label: name,
              };
            })
        );
      }
    }

    createList();
    setIsLoading(false);
  }, [heroList, name_display, grima_display, backpack_display]);

  useEffect(() => {
    // change name based on current name display settings
    // @TODO
    if (hero.name === "") {
      setDropdown({ label: "" });
    } else {
      var name = heroList.filter((h) => h.full_name === hero.name)[0];
      if (name_display === "full") {
        setDropdown({ value: hero, label: name.full_name });
      } else if (name_display === "title") {
        setDropdown({ value: hero, label: name.name_title });
      } else if (name_display === "abbrev") {
        setDropdown({ value: hero, label: name.abbreviated });
      }
    }
  }, [hero]);

  // gets the character and returns the object to the parent and sets the hero name equal to the label
  async function handleChange(event, value) {
    props.onChange(value.value);
  }

  return (
    <div>
      <Autocomplete
        id="hero list"
        disableClearable
        openOnFocus
        selectOnFocus
        options={list}
        value={dropdown}
        onChange={handleChange}
        loading={isLoading}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, option2) => option.value === option2.value}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Hero List"></TextField>}
      />
    </div>
  );
}
