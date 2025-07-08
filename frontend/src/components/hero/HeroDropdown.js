import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from '@mui/material/Autocomplete';


// redux import
import { useSelector } from "react-redux";

export default function HeroDropdown(props) {
  // whole hero list that contains all names, backpacks, and character ids
  const name_display = useSelector((state) => state.display.name_display);
  const heroList = useSelector((state) => state.display.heroList);
  const sortedHeroList = useSelector((state) => state.display.sortedHeroList);
  const grouping = useSelector((state) => state.display.grouping);
  // list of heroes only used for display (uses parts of the hero list to creat this)
  // const hero = useSelector((state) => state.tabList.tabList[props.id].hero);
  const [selectedHero, setSelectedHero] = useState(null)
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const toggleGroup = (group) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };
  const customFilter = createFilterOptions({
    stringify: (option) =>
      `${option.full_name} ${option.common_name}`.toLowerCase(),
  });


  // gets the character and returns the object to the parent and sets the hero name equal to the label
  async function handleChange(value) {
    setSelectedHero(value)
    props.onChange(value)
  }

  return (
    <Autocomplete
      disableClearable
      openOnFocus
      selectOnFocus
      options={grouping ? sortedHeroList : heroList}
      groupBy={(option) => grouping ? option.game : undefined}
      filterOptions={customFilter}
      getOptionLabel={(option) => name_display ? option.full_name : option.common_name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedHero}
      onChange={(_, newHero) => handleChange(newHero)}
      renderGroup={grouping ? (params) => {
        const isCollapsed = collapsedGroups[params.group];
        return (
          <div key={params.key}>
            <div
              onClick={() => toggleGroup(params.group)}
              style={{
                cursor: 'pointer',
                backgroundColor: '#eee',
                fontWeight: 'bold',
                padding: '6px 10px',
                borderBottom: '1px solid #ccc'
              }}
            >
              {isCollapsed ? '▶' : '▼'} {params.group}
            </div>
            {!isCollapsed && params.children}
          </div>
        );
      } : undefined}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <strong>{name_display === 'full_name' ? option.full_name : option.common_name}</strong>
            <span style={{ color: 'gray' }}>
              &nbsp;({name_display === 'full_name' ? option.common_name : option.full_name})
            </span>
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} variant="outlined" label="Hero List"></TextField>}
    />
  );
}
