import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";

export default function Merges(props) {
  const merges = useSelector((state) => state.tabList.tabList[props.id].merges);
  const [mergeSelector, setMergeSelector] = useState(null);
  let mergeOptions = [
    { value: 0, label: "+0" },
    { value: 1, label: "+1" },
    { value: 2, label: "+2" },
    { value: 3, label: "+3" },
    { value: 4, label: "+4" },
    { value: 5, label: "+5" },
    { value: 6, label: "+6" },
    { value: 7, label: "+7" },
    { value: 8, label: "+8" },
    { value: 9, label: "+9" },
    { value: 10, label: "+10" },
  ];

  useEffect(() => {
    if (merges === 0) {
      setMergeSelector(null);
    } else {
      setMergeSelector({ value: merges, label: "+" + merges });
    }
  }, [merges]);

  const handleChange = (event, value) => {
    if (value !== null) {
      props.onChange(value.value);
    } else {
      props.onChange(0);
    }
  };

  return (
    <div>
      <Autocomplete
        id="flower dropdown"
        options={mergeOptions}
        value={mergeSelector}
        onChange={handleChange}
        disabled={!props.hero.exists}
        getOptionLabel={(option) => option.label || ""}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => <TextField {...params} variant="standard" placeholder="Merges"></TextField>}
      />
    </div>
  );
}
