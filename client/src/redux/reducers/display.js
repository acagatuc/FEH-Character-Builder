import { CHANGE_NAME_DISPLAY, CHANGE_GRIMA, CHANGE_BACKPACK, CHANGE_DUO_DISPLAY, CHANGE_TAB_IMAGE_DISPLAY } from "../actionTypes";

const initState = {
  name_display: "full",
  grima: false,
  backpack: false,
  duo_display: "",
  tab_image: "chibis",
};

export default function (state = initState, action) {
  switch (action.type) {
    // tabs actions
    case CHANGE_NAME_DISPLAY: {
      const { nameDisplay } = action.payload;
      state.name_display = nameDisplay;
      return { ...state };
    }
    case CHANGE_GRIMA: {
      const { grima } = action.payload;
      state.grima = grima;
      return { ...state };
    }
    case CHANGE_BACKPACK: {
      const { bp } = action.payload;
      state.backpack = bp;
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
