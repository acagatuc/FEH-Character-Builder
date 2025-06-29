// import { v4 as uuid } from 'uuid';
// import { defaultHero } from '../constants.js'
// import {
//   ADD_TAB,
//   COPY_TAB,
//   DELETE_TAB,
//   CHANGE_TAB,
//   RESET_TAB,
// } from "../actionTypes";

// const firstTab = uuid()

// const initState = {
//   currentTab: 0,
//   length: 1,
//   tabList: [
//     { key: firstTab, label: `Build 1`, hero: defaultHero },
//   ],
// };

// const tabList = (state = initState, action) => {
//   switch (action.type) {
//     // tabs actions
//     case ADD_TAB: {
//       const id = uuid();
//       state.tabList.push({ id, label: `Build ${state.length + 1}`, hero: defaultHero });
//       state.length++;
//       console.log(state)
//       return { ...state, currentTab: state.tabList.length - 1 };
//     }
//     case COPY_TAB: {
//       const { id, length } = action.payload;
//       var copiedHero = {};
//       Object.assign(copiedHero, state.tabList[id]);
//       copiedHero.key = uuid();
//       copiedHero.id = length;
//       state.tabList = [...state.tabList, copiedHero];
//       return { ...state };
//     }
//     case DELETE_TAB: {
//       const { id } = action.payload;
//       for (var i = id; i < state.tabList.length; i++) {
//         state.tabList[i].key--;
//         state.tabList[i].id--;
//       }
//       state.tabList.splice(id, 1);
//       state.key = state.tabList.length;

//       if (state.currentTab >= state.tabList.length) {
//         state.currentTab--;
//       }
//       return { ...state };
//     }
//     case CHANGE_TAB: {
//       const { id } = action.payload;
//       return { ...state, currentTab: id };
//     }
//     case RESET_TAB: {
//       const { id } = action.payload;
//       console.log(id)
//       state.tabList[id] = {
//         key: state.tabList[id].key,
//       };
//       return { ...state };
//     }
//     default:
//       return state;
//   }
// };

// export default tabList;
