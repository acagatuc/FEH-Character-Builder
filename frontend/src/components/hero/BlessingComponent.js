import { useState, useEffect } from "react";
import { Autocomplete, Box, TextField, Chip } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";

const BlessingComponent = (props) => {
//   const reduxBlessing = useSelector((state) => state.hero.heroes[props.id].blessing);
  const [blessing, setBlessing] = useState(null);
//   const [isDisabled, setIsDisabled] = useState(true);
  const blessingOptions = [
    { value: "water", label: "Water" },
    { value: "wind", label: "Wind" },
    { value: "fire", label: "Fire" },
    { value: "earth", label: "Earth" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "astra", label: "Astra" },
    { value: "anima", label: "Anima" },
  ];

//   useEffect(() => {
//     if (
//       props.hero.hero_type === "normal" ||
//       props.hero.hero_type === "duo" ||
//       props.hero.hero_type === "harmonic" ||
//       props.hero.hero_type === "rearmed" ||
//       props.hero.hero_type === "ascended"
//     ) {
//       setIsDisabled(false);
//     } else {
//       setIsDisabled(true);
//     }
//   }, [props.hero.name, props.hero.hero_type]);

//   useEffect(() => {
//     if (reduxBlessing === "") {
//       setBlessing({ value: null, label: "" });
//     } else {
//       setBlessing({ value: reduxBlessing, label: reduxBlessing.charAt(0).toUpperCase() + reduxBlessing.slice(1) });
//     }
//   }, [reduxBlessing]);

  const handleBlessing = (value) => {
    setBlessing(value)
    props.onChange(value.label)
  };

  return (
    <Autocomplete
      id="blessing dropdown"
      sx={{ width: "100%" }}
      options={blessingOptions}
      value={blessing}
      onChange={(_, selectedBlessing) => handleBlessing(selectedBlessing)}
    //   disabled={!props.hero.exists || isDisabled}
      getOptionLabel={(option) => option.label || ""}
      renderOption={(props, option) => <Box {...props}>{option.label}</Box>}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField {...params} variant="standard" placeholder={props.placeholder}></TextField>}
    />
  );
}


const BlessingHeroSelectionComponent = (props) => {
  const [heroList, setHeroList] = useState([]);
  const [selectedHeroList, setSelectedHeroList] = useState([]);
  const [stats, setStats] = useState([0, 0, 0, 0, 0]);
  const [isDisabled, setIsDisabled] = useState(true);
  const blessing = useSelector((state) => state.hero.heroes[props.id].blessing || null);
  const blessingHeroList = useSelector((state) => state.hero.heroes[props.id].blessingHeroList || []);

  useEffect(() => {
    setIsDisabled(true);
    async function fetchMyAPI() {
      var url = `http://localhost:5000/api/heroes/lm/` + blessing;
      let response = await fetch(url);
      response = await response.json();
      setHeroList(
        []
          .concat(response)
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(function (hero) {
            return {
              value: hero,
              label: hero.hero_name,
            };
          })
      );
      setStats([0, 0, 0, 0, 0]);
    }
    if (blessing !== null && blessing !== "" && blessing !== "normal" && blessing !== "duo" && blessing !== "harmonic") {
      fetchMyAPI();
      setIsDisabled(false);
    }
  }, [blessing]);

  useEffect(() => {
    setSelectedHeroList(blessingHeroList);
  }, [blessingHeroList]);

  const handleAdd = (chip) => {
    setSelectedHeroList([...selectedHeroList, chip])
    // if (chip.currentTarget.title === "Clear") {
    // //   calculateHeroBuffs(stats, [], false);
    // } else if (selectedHeroList.length < 6) {
    //   var hero = heroList.find((element) => {
    //     return element.label === chip.target.innerHTML;
    //   });
    //   var array = [...selectedHeroList, { label: chip.target.innerHTML, index: selectedHeroList.length }];
    //   calculateHeroBuffs(hero.value.stats, array, true);
    // }
  };

  const handleDelete = (index, option) => {
    const array = [...selectedHeroList];
    array.splice(index, 1);
    setSelectedHeroList(array)
    // calculateHeroBuffs(hero.value.stats, array, false);
  };

  const calculateHeroBuffs = (heroStats, heroArray, addOrSubtract) => {
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
    props.onChange(arr, heroArray);
  };

  return (
    <div style={{ marginTop: "5px", marginBottom: "10px", height: "100px", width: "100%" }}>
      {selectedHeroList.length === 0 ? (
        <div className="blessing-hero-container blessing-hero-title">Ally List</div>
      ) : (
        <div className="blessing-hero-container">
          {selectedHeroList.map((option, index) => (
            <Chip
              variant="outlined"
              key={index}
              label={option.label}
              clickable
              onDelete={() => {
                handleDelete(index, option);
              }}
            />
          ))}
        </div>
      )}
      <Autocomplete
        id="tags-outlined"
        value={[]}
        inputValue={""}
        options={heroList}
        getOptionLabel={(option) => option.label || ""}
        disabled={isDisabled}
        getOptionDisabled={(option) => selectedHeroList.length === 6}
        onChange={(_, addHero) => {
          handleAdd(addHero);
        }}
        isOptionEqualToValue={(option, value) => option.label === value}
        renderInput={(params) => <TextField {...params} variant="standard" label="Allies" placeholder="Hero" fullWidth />}
      />
    </div>
  );
}

export { BlessingComponent, BlessingHeroSelectionComponent };