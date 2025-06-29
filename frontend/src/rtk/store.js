// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from './tabsSlice';
import displayReducer from './displaySlice';
import heroReducer from './heroSlice';

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    display: displayReducer,
    hero: heroReducer
  },
});
