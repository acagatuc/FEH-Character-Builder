import {
  FETCH_HERO_LIST,
  CHANGE_NAME_DISPLAY,
  CHANGE_GRIMA,
  CHANGE_BACKPACK,
  CHANGE_FEHNIX,
  CHANGE_DUO_DISPLAY,
  CHANGE_TAB_IMAGE_DISPLAY,
} from "../actionTypes";

const initState = {
  name_display: "full",
  grima: false,
  backpack: false,
  fehnix: false,
  duo_display: "",
  tab_image: "chibis",
  fullHeroList: [],
  heroList: [],
  loaded: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    // herolist actions
    case FETCH_HERO_LIST: {
      const { heroes } = action.payload;
      state.fullHeroList = heroes;
      state.loaded = true;
      return { ...state };
    }

    // tabs actions
    case CHANGE_NAME_DISPLAY: {
      const { nameDisplay } = action.payload;
      if (nameDisplay !== "") {
        state.name_display = nameDisplay;
      }
      if (state.name_display === "full") {
        state.heroList = []
          .concat(state.fullHeroList)
          .sort((a, b) => (a.full_name > b.full_name ? 1 : -1))
          .map(function (listItem) {
            // if the user wants to display grima instead of fallen robin
            var name = listItem.full_name;
            if (state.grima_display && name.includes("Fallen Robin")) {
              name = name.replace("Fallen Robin", "Grima");
            }
            return {
              value: listItem.character_id,
              label: name,
            };
          });
      }
      // if the user wants names and titles
      else if (state.name_display === "title") {
        state.heroList = []
          .concat(state.fullHeroList)
          .sort((a, b) => (a.name_title > b.name_title ? 1 : -1))
          .map(function (listItem) {
            // if the user wants to display grima instead of fallen robin
            var name = listItem.name_title;
            if (state.grima_display && name.includes("Fallen Robin")) {
              name = name.replace("Fallen Robin", "Grima");
            }
            return {
              value: listItem.character_id,
              label: name,
            };
          });
      }
      // if the user wants abbreviated names
      else if (state.name_display === "abbrev") {
        state.heroList = []
          .concat(state.fullHeroList)
          .sort((a, b) => (a.abbreviated > b.abbreviated ? 1 : -1))
          .map(function (listItem) {
            // if the user wants to display grima instead of fallen robin
            var name = listItem.abbreviated;
            if (state.grima_display && name.includes("F!F!Robin")) {
              name = name.replace("F!F!Robin", "F!Grima");
            } else if (state.grima_display && name.includes("F!M!Robin")) {
              name = name.replace("F!M!Robin", "M!Grima");
            }
            return {
              value: listItem.character_id,
              label: name,
            };
          });
      }
      return { ...state };
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
