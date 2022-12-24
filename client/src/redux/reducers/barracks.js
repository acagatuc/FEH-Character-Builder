import { SAVE_BUILD_TO_BARRACKS, DELETE_BUILD_FROM_BARRACKS } from "../actionTypes";

const initState = {
  key: 0,
  builds: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case SAVE_BUILD_TO_BARRACKS: {
      const { build } = action.payload;
      var copiedHero = {};
      Object.assign(copiedHero, build);
      copiedHero.key = state.key;
      state.key++;
      state.builds = [...state.builds, copiedHero];
      return { ...state };
    }
    // case LOAD_BUILD_FROM_BARRACKS: {
    //   const { id } = action.payload;
    //   console.log(id);
    //   // change tablist state from here?
    //   return { ...state };
    // }
    case DELETE_BUILD_FROM_BARRACKS: {
      const { id } = action.payload;
      state.builds.splice(id, 1);
      for (var i = id; i < state.builds.length; i++) {
        state.builds[i].key--;
        console.log(state.builds[i].key);
      }
      state.key--;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
}
