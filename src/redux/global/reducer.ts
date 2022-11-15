import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { globalActions } from './actions';

const globalSlice = createSlice({
  name: modules.GLOBAL,
  initialState: {
    theme: 'light',
    isFullScreenCameraOpen: false,
    isRussian: false,
    isAuth: false,
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
  },

  extraReducers: (builder) => {
    builder.addCase(globalActions.login.fulfilled, (state, action) => {
      state.isAuth = action.payload;
    });
    builder.addCase(globalActions.checkAuth.fulfilled, (state, action) => {
      state.isAuth = action.payload;
    });
  },
});

export const globalReducer = globalSlice.reducer;
export const globalSettingActions = globalSlice.actions;
