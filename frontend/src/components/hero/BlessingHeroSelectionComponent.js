// import React, { useState, useEffect } from "react";
// import { Autocomplete, TextField, Chip } from "@mui/material";
// import "./HeroComponent.css";

// // redux import
// import { useSelector } from "react-redux";

// export default function BlessingHeroSelectionComponent(props) {
//   const [heroList, setHeroList] = useState([]);
//   const [selectedHeroList, setSelectedHeroList] = useState([]);
//   const [stats, setStats] = useState([0, 0, 0, 0, 0]);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const test = "";
//   const blessing = useSelector((state) => state.tabList.tabList[props.id].blessing);
//   const blessingHeroList = useSelector((state) => state.tabList.tabList[props.id].blessingHeroList);

//   useEffect(() => {
//     setIsDisabled(true);
//     async function fetchMyAPI() {
//       let response = await fetch(`http://localhost:5000/LegendaryMythic/` + blessing);
//       response = await response.json();
//       setHeroList(
//         []
//           .concat(response)
//           .sort((a, b) => (a.name > b.name ? 1 : -1))
//           .map(function (hero) {
//             return {
//               value: hero,
//               label: hero.name,
//             };
//           })
//       );

//       setStats([0, 0, 0, 0, 0]);
//     }
//     if (blessing !== null && blessing !== "" && blessing !== "normal" && blessing !== "duo" && blessing !== "harmonic") {
//       fetchMyAPI();
//       setIsDisabled(false);
//     }
//     // not sure why its yelling because i dont understand this error.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [blessing]);

//   useEffect(() => {
//     setSelectedHeroList(blessingHeroList);
//   }, [blessingHeroList]);

//   const handleAdd = (chip) => {
//     if (chip.currentTarget.title === "Clear") {
//       calculateHeroBuffs(stats, [], false);
//     } else if (selectedHeroList.length < 6) {
//       var hero = heroList.find((element) => {
//         return element.label === chip.target.innerHTML;
//       });
//       var array = [...selectedHeroList, { label: chip.target.innerHTML, index: selectedHeroList.length }];
//       calculateHeroBuffs(hero.value.stats, array, true);
//     }
//   };

//   const handleDelete = (index, option) => {
//     var hero = heroList.find((element) => {
//       return element.label === option.label;
//     });
//     const array = [...selectedHeroList];
//     array.splice(index, 1);
//     calculateHeroBuffs(hero.value.stats, array, false);
//   };

//   const calculateHeroBuffs = (heroStats, heroArray, addOrSubtract) => {
//     // true for add, false for subtract
//     var arr = stats;
//     if (addOrSubtract) {
//       arr[0] += +heroStats[0];
//       arr[1] += +heroStats[1];
//       arr[2] += +heroStats[2];
//       arr[3] += +heroStats[3];
//       arr[4] += +heroStats[4];
//       setStats(arr);
//     } else {
//       arr[0] -= +heroStats[0];
//       arr[1] -= +heroStats[1];
//       arr[2] -= +heroStats[2];
//       arr[3] -= +heroStats[3];
//       arr[4] -= +heroStats[4];
//     }
//     props.onChange(arr, heroArray);
//   };

//   return (
//     <div style={{ marginTop: "5px", marginBottom: "10px", height: "100px", width: "100%" }}>
//       {selectedHeroList.length === 0 ? (
//         <div className="blessing-hero-container blessing-hero-title">Ally List</div>
//       ) : (
//         <div className="blessing-hero-container">
//           {selectedHeroList.map((option, index) => (
//             <Chip
//               variant="outlined"
//               key={index}
//               label={option.label}
//               clickable
//               onDelete={() => {
//                 handleDelete(index, option);
//               }}
//             />
//           ))}
//         </div>
//       )}
//       <Autocomplete
//         id="tags-outlined"
//         value={[]}
//         inputValue={test}
//         options={heroList}
//         getOptionLabel={(option) => option.label || ""}
//         disabled={isDisabled}
//         getOptionDisabled={(option) => selectedHeroList.length === 6}
//         onChange={(e) => {
//           handleAdd(e);
//         }}
//         isOptionEqualToValue={(option, value) => option.label === value}
//         renderInput={(params) => <TextField {...params} variant="standard" label="Allies" placeholder="Hero" fullWidth />}
//       />
//     </div>
//   );
// }
