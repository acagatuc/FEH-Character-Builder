// thunks.js or inside tabsSlice
import { createAsyncThunk } from '@reduxjs/toolkit';
import { copyTab } from './tabsSlice';
import { copyHero } from './heroSlice';
import { useSelector } from 'react-redux';


export const copyTabWithHero = createAsyncThunk(
  'tabs/copyTabWithHero',
  async ({ id, length }, { dispatch }) => {
    // Dispatch both actions
    dispatch(copyTab({ id, length }));
    dispatch(copyHero({ id, length }));
  }
);
