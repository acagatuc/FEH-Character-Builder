import { v4 as uuid } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';
import { defaultHero } from './constants'

const firstTab = uuid()

const initialState = {
  tabList: [
    { key: firstTab, label: `Build 1`, id: 0, hero: defaultHero },
  ],
  currentTab: 0,
  length: 1,
};
// copy and delete DO NOT work. finish later

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab: (state, action) => {
      const newTab = {
        key: uuid(),
        label: `Build ${state.length + 1}`,
        id: state.length++,
        hero: defaultHero,
        ...action.payload,
      };
      state.tabList.push(newTab);
      state.currentTab = newTab.id;
    },

    copyTab: (state, action) => {
      const source = state.tabList.find(t => t.id === action.payload.id);
      if (!source) return;
      const copy = {
        ...source,
        key: uuid(),
        id: action.payload.length,
        label: `${source.label} Copy`,
      };
      state.tabList.push(copy);
      state.currentTab = copy.id;
      
      console.log(JSON.parse(JSON.stringify(state)));
    },

    deleteTab: (state, action) => {
      const deleteId = action.payload;
      state.tabList = state.tabList.filter(t => t.id !== deleteId);
      state.length = state.tabList.length;

      if (state.currentTab === deleteId) {
        state.currentTab = state.tabList[0]?.id || null;
      }
    },

    changeTab: (state, action) => {
      const targetId = action.payload;
      if (state.tabList.some(tab => tab.id === targetId)) {
        state.currentTab = targetId;
      }
    },

    resetTab: (state, action) => {
      const tabId = action.payload;
      state.tabList[tabId].hero = defaultHero;
    },
  },
});

export const { addTab, copyTab, deleteTab, changeTab, resetTab } = tabsSlice.actions;
export default tabsSlice.reducer;
