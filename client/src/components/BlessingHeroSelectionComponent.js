import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

export default function BlessingHeroSelectionComponent(props) {
  const [heroList, setHeroList] = useState([]);
  const [selectedHeroList, setSelectedHeroList] = useState([]);
  const [stats, setStats] = useState([0, 0, 0, 0, 0]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(true);
    setSelectedHeroList([]);
    setStats([0, 0, 0, 0, 0]);
  }, [props.hero.name]);

  useEffect(() => {
    setIsDisabled(true);
    async function fetchMyAPI() {
      let response = await fetch(`http://localhost:5000/LegendaryMythic/` + props.blessing);
      response = await response.json();
      setHeroList(
        []
          .concat(response)
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(function (hero) {
            return {
              value: hero,
              label: hero.name,
            };
          })
      );

      setSelectedHeroList([]);
      setStats([0, 0, 0, 0, 0]);
    }
    if (
      props.blessing !== null &&
      props.blessing !== "" &&
      props.blessing !== "normal" &&
      props.blessing !== "duo" &&
      props.blessing !== "harmonic"
    ) {
      fetchMyAPI();
      setIsDisabled(false);
      setSelectedHeroList([]);
      setStats([0, 0, 0, 0, 0]);
      calculateHeroBuffs(stats, false);
    }
    // not sure why its yelling because i dont understand this error.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.blessing]);

  const handleAdd = (chip) => {
    var hero = heroList.find((element) => {
      return element.label === chip.target.innerHTML;
    });
    setSelectedHeroList([...selectedHeroList, chip.target.innerHTML]);
    calculateHeroBuffs(hero.value.stats, true);
  };

  const handleDelete = (index, option) => {
    var hero = heroList.find((element) => {
      return element.label === option;
    });
    const arr = [...selectedHeroList];
    arr.splice(index, 1);
    setSelectedHeroList(arr);
    calculateHeroBuffs(hero.value.stats, false);
  };

  const calculateHeroBuffs = (heroStats, addOrSubtract) => {
    // true for add, false for subtract
    var arr = stats;
    if (addOrSubtract) {
      arr[0] += +heroStats[0];
      arr[1] += +heroStats[1];
      arr[2] += +heroStats[2];
      arr[3] += +heroStats[3];
      arr[4] += +heroStats[4];
      setStats(arr);
    } else {
      arr[0] -= +heroStats[0];
      arr[1] -= +heroStats[1];
      arr[2] -= +heroStats[2];
      arr[3] -= +heroStats[3];
      arr[4] -= +heroStats[4];
    }
    props.onChange(arr);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        disableClearable
        options={heroList}
        getOptionLabel={(option) => option.label}
        defaultValue={[]}
        value={selectedHeroList}
        disabled={isDisabled}
        onChange={(e) => {
          handleAdd(e);
        }}
        isOptionEqualToValue={(option, value) => option.label === value}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              variant="outlined"
              key={index}
              label={option}
              clickable
              onDelete={() => {
                handleDelete(index, option);
              }}
            />
          ))
        }
        renderInput={(params) => <TextField {...params} variant="standard" label="Hero Buffs" placeholder="Heroes" fullWidth />}
      />
    </div>
  );
}
