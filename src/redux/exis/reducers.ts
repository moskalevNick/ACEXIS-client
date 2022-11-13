import { ExisType } from './../types';
import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { exisActions } from './actions';

const exisSlice = createSlice({
  name: modules.EXIS,
  initialState: {
    exises: [] as ExisType[],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(exisActions.getExis.fulfilled, (state, action) => {
      state.exises = [...state.exises, action.payload];
    });
  },
});

export const exisReducer = exisSlice.reducer;
