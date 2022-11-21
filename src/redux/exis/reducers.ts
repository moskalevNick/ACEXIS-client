import { ExisType } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { exisActions } from './actions';

const exisSlice = createSlice({
  name: modules.EXIS,
  initialState: {
    exises: [] as ExisType[],
    pinnedExis: {} as ExisType | null,
  },
  reducers: {
    clearExises: (state) => {
      state.exises = [];
      state.pinnedExis = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(exisActions.getExises.fulfilled, (state, action) => {
        state.exises = action.payload;
        action.payload.forEach((el) => {
          if (el.isPinned) {
            state.pinnedExis = el;
          }
        });
      })

      .addCase(exisActions.editExis.fulfilled, (state, action) => {
        const newArr = state.exises.filter((el) => el.id !== action.payload.id);
        newArr.push(action.payload);
        state.exises = newArr;
        if (action.payload.id === state.pinnedExis?.id) {
          if (action.payload.isPinned) {
            state.pinnedExis = action.payload;
          }
          if (!action.payload.isPinned) {
            state.pinnedExis = null;
          }
        }
        if (!state.pinnedExis || Object.keys(state.pinnedExis).length === 0) {
          if (action.payload.isPinned) {
            state.pinnedExis = action.payload;
          }
        }
      })

      .addCase(exisActions.deleteExis.fulfilled, (state, action) => {
        const newArr = state.exises.filter((el) => el.id !== action.payload.id);
        state.exises = newArr;
        if (action.payload.isPinned) {
          state.pinnedExis = null;
        }
      })
      .addCase(exisActions.createExis.fulfilled, (state, action) => {
        state.exises = [...state.exises, action.payload];
      });
  },
});

export const exisReducer = exisSlice.reducer;
export const exisSettingsActions = exisSlice.actions;
