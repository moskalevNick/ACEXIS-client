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
    isLoading: false,
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
      })
      .addCase(globalActions.logout.fulfilled, () => {
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('access-token');
        window.location.href = '/';
      });
  },
});

export const globalReducer = globalSlice.reducer;
export const globalSettingActions = globalSlice.actions;
