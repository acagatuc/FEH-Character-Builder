import { createSlice } from '@reduxjs/toolkit';

const groupOrder = [
  "Heroes",
  "Shadow Dragon/(New) Mystery",
  "Echoes",
  "Genealogy of the Holy War",
  "Thracia 776",
  "Blazing Blade",
  "Binding Blade",
  "Sacred Stones",
  "Path of Radiance",
  "Radiant Dawn",
  "Awakening",
  "Fates",
  "Tokyo Mirage Sessions",
  "Three Houses",
  "Engage",
];

function sortHeroesByCustomGameOrder(list) {
  return [...list].sort((a, b) => {
    const groupA = groupOrder.indexOf(a.game);
    const groupB = groupOrder.indexOf(b.game);

    if (groupA !== groupB) return groupA - groupB;

    return a.full_name.localeCompare(b.full_name);
  });
}

const initialState = {
  name_display: 'full_name',
  grima: false,
  backpack: false,
  fehnix: false,
  duo_display: "",
  tab_image: "chibis",
  heroList: [],
  sortedHeroList: [],
  loaded: false,
  grouping: false,
  fullHeroList: [],
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    loadHeroList(state, action) {
      const response = action.payload;
      state.heroList = response;
      state.sortedHeroList = sortHeroesByCustomGameOrder(response);
      state.loaded = true;
      // If you have fullHeroList from somewhere, set it here or separately
    },
    changeNameDisplay(state, action) {
      const nameDisplay = action.payload;
      state.name_display = nameDisplay;
    },
    changeGroupingDisplay(state, action) {
      console.log(action.payload)
      state.grouping = action.payload;
    },
  },
});

export const {
  loadHeroList,
  changeNameDisplay,
  changeGrimaDisplay,
  changeBackpackDisplay,
  changeFehnixDisplay,
  changeDuoDisplay,
  changeGroupingDisplay,
  changeTabImageDisplay,
} = displaySlice.actions;

export default displaySlice.reducer;
