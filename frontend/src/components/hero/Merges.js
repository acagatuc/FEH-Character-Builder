import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

//redux imports
import { useSelector } from "react-redux";

export default function Merges(props) {
  // const merges = useSelector((state) => state.tabList.tabList[props.id].merges);
  const [merges, setMerges] = useState(null)
  const maxMerges = useState([...new Array(11)].map((_, i) => i));
  const [mergeOptions, setMergeOptions] = useState([])

  useEffect(() => {
    if (!props.disabled) {
      setMergeOptions(
        maxMerges[0].map((element) => {
          return { value: element, label: "+" + element };
        })
      );
    }
  }, [props.hero]);

  // useEffect(() => {
  //   if (merges === 0) {
  //     setMergeSelector(null);
  //   } else {
  //     setMergeSelector({ value: merges, label: "+" + merges });
  //   }
  // }, [merges]);

  const handleChange = (value) => {
    if (value !== null) {
      props.onChange(value.value);
    } else {
      props.onChange(0);
    }
  };

  return (
    <Autocomplete
      id="merge dropdown"
      sx={{ width: "48%" }}
      options={mergeOptions}
      value={merges}
      onChange={(_, value) => handleChange(value)}
      disabled={props.disabled}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField {...params} variant="standard" placeholder="Merges"></TextField>}
    />
  );
}
