import { SAVE_BUILD_TO_BARRACKS, DELETE_BUILD_FROM_BARRACKS } from "../actionTypes";

const initState = {
  key: 0,
  builds: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case SAVE_BUILD_TO_BARRACKS: {
      const { name, build } = action.payload;
      var copiedHero = {};
      Object.assign(copiedHero, build);
      copiedHero.key = state.key;
      copiedHero.weapon = copiedHero.weapon.name;
      if (name === "") {
        copiedHero.build_name = build.label;
      } else {
        copiedHero.build_name = name;
      }
      state.key++;
      state.builds = [...state.builds, copiedHero];
      return { ...state };
    }
    case DELETE_BUILD_FROM_BARRACKS: {
      const { id } = action.payload;
      for (var i = id; i < state.builds.length; i++) {
        state.builds[i].key--;
      }
      state.builds.splice(id, 1);
      state.key = state.builds.length;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
}
