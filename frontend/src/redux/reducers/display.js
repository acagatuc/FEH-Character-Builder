import {
  FETCH_HERO_LIST,
  CHANGE_NAME_DISPLAY,
  CHANGE_GRIMA,
  CHANGE_BACKPACK,
  CHANGE_FEHNIX,
  CHANGE_DUO_DISPLAY,
  CHANGE_GROUPING_DISPLAY,
  CHANGE_TAB_IMAGE_DISPLAY,
} from "../actionTypes";

const initState = {
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
};

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

export function sortHeroesByCustomGameOrder(list) {
  return [...list].sort((a, b) => {
    const groupA = groupOrder.indexOf(a.game);
    const groupB = groupOrder.indexOf(b.game);

    // Sort based on group index first
    if (groupA !== groupB) return groupA - groupB;

    // If in same group, sort by full name
    return a.full_name.localeCompare(b.full_name);
  });
}

export default function (state = initState, action) {
  switch (action.type) {
    // herolist actions
    case FETCH_HERO_LIST: {
      const { heroes } = action.payload;
      state.heroList = heroes;
      state.sortedHeroList = sortHeroesByCustomGameOrder(heroes)
      state.loaded = true;
      return { ...state };
    }

    // tabs actions
    case CHANGE_NAME_DISPLAY: {
      const { nameDisplay } = action.payload;
      return { ...state, name_display: nameDisplay };
    }
    case CHANGE_GRIMA: {
      const { grima } = action.payload;
      if (grima !== "") {
        state.grima = grima;
      }
      state.heroList = [].concat(state.heroList).map(function (listItem) {
        // if the user wants to display backpacks
        var name = listItem.label;
        if (state.grima && name.includes("Fallen Robin")) {
          if (state.name_display === "full") {
            name = name.replace("Fallen Robin", "Grima");
          } else if (state.name_display === "abbrev") {
            if (name.includes("F!F!Robin")) {
              name = name.replace("F!F!Robin", "F!Grima");
            } else if (name.includes("F!M!Robin")) {
              name = name.replace("F!M!Robin", "M!Grima");
            }
          }
        } else if (!state.grima && name.includes("Grima")) {
          if (state.name_display === "full") {
            name = name.replace("Grima", "Fallen Robin");
          } else if (state.name_display === "abbrev") {
            if (name.includes("F!F!Robin")) {
              name = name.replace("F!Grima", "F!F!Robin");
            } else if (name.includes("F!M!Robin")) {
              name = name.replace("M!Grima", "F!M!Robin");
            }
          }
        }
        return {
          value: listItem.value,
          label: name,
          origin: listItem.origin,
        };
      });
      return { ...state };
    }
    case CHANGE_BACKPACK: {
      const { bp } = action.payload;
      if (bp !== "") {
        state.backpack = bp;
      }
      state.heroList = [].concat(state.heroList).map(function (listItem) {
        // if the user wants to display backpacks
        var temp = state.fullHeroList.find((element) => element.character_id === listItem.value);
        var name = listItem.label;
        if (state.backpack && temp.backpack !== null) {
          name = name + " (+" + temp.backpack + ")";
        } else {
          name = name.split("(+")[0].trim();
        }
        return {
          value: listItem.value,
          label: name,
          origin: listItem.origin,
        };
      });
      return { ...state };
    }
    case CHANGE_FEHNIX: {
      const { fehnix } = action.payload;
      state.fehnix = fehnix;
      return { ...state };
    }
    case CHANGE_DUO_DISPLAY: {
      const { display } = action.payload;
      state.duo_display = display;
      return { ...state };
    }
    case CHANGE_GROUPING_DISPLAY: {
      const { grouped } = action.payload;
      state.grouping = grouped;

      return { ...state };
    }
    case CHANGE_TAB_IMAGE_DISPLAY: {
      const { display } = action.payload;
      state.tab_image = display;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
}
