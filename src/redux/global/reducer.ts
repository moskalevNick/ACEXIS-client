import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { globalActions } from './actions';

import { FiltersType } from '../../types';

const defaultValues: FiltersType = {
  date: undefined, // FIXME: set default dates like { startDate: 1234, endDate: 4132 }
  range: {
    min: 0,
    max: 1000,
  },
  status: [],
};

const globalSlice = createSlice({
  name: modules.GLOBAL,
  initialState: {
    theme: 'light',
    isFullScreenCameraOpen: false,
    isRussian: false,
    isAuth: false,
    isLoading: false,
    filters: defaultValues,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setFSCamera: (state, action) => {
      state.isFullScreenCameraOpen = action.payload;
    },
    setIsRussian: (state, action) => {
      state.isRussian = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setFilterDate: (state, action) => {
      state.filters.date = action.payload;
    },
    setFilterRange: (state, action) => {
      state.filters.range = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filters.status = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(globalActions.login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalActions.login.fulfilled, (state, action) => {
        state.isAuth = action.payload;
        state.isLoading = false;
      })
      .addCase(globalActions.login.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(globalActions.checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalActions.checkAuth.fulfilled, (state, action) => {
        state.isAuth = action.payload;
        state.isLoading = false;
      })
      .addCase(globalActions.checkAuth.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const globalReducer = globalSlice.reducer;
export const globalSettingActions = globalSlice.actions;
