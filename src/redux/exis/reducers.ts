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
    builder
      .addCase(exisActions.getExises.fulfilled, (state, action) => {
        state.exises = action.payload;
      })
      .addCase(exisActions.editExis.fulfilled, (state, action) => {
        const newArr = state.exises.filter((el) => el.id !== action.payload.id);
        newArr.push(action.payload);
        state.exises = newArr;
      })
      .addCase(exisActions.deleteExis.fulfilled, (state, action) => {
        const newArr = state.exises.filter((el) => el.id !== action.payload.id);
        state.exises = newArr;
      })
      .addCase(exisActions.createExis.fulfilled, (state, action) => {
        state.exises = [...state.exises, action.payload];
      });
  },
});

export const exisReducer = exisSlice.reducer;
