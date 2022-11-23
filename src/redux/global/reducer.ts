import { UserAvatarType } from './../../types';
import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { globalActions } from './actions';

import { FiltersType, ImageType } from '../../types';
import { Nottification } from '../../components/Nottification/Nottification';

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
    isRus: false,
    isAuth: false,
    linkBot: null,
    maxBill: 0,
    minBill: 0,
    isLoading: false,
    isAvatarLoading: false,
    filters: defaultValues,
    avatar: null as UserAvatarType | null,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setFSCamera: (state, action) => {
      state.isFullScreenCameraOpen = action.payload;
    },
    setIsRussian: (state, action) => {
      state.isRus = action.payload;
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
        state.avatar = action.payload.avatar;
        state.isAuth = action.payload.isAuth;
        state.theme = action.payload.isDark ? 'dark' : 'light';
        state.linkBot = action.payload.linkBot;
        state.isRus = action.payload.isRus;
        state.maxBill = action.payload.maxBill;
        state.minBill = action.payload.minBill;
        state.isLoading = false;
      })
      .addCase(globalActions.login.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(globalActions.checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalActions.checkAuth.fulfilled, (state, action) => {
        state.isAuth = action.payload.isAuth;
        state.avatar = action.payload.avatar;
        state.theme = action.payload.isDark ? 'dark' : 'light';
        state.linkBot = action.payload.linkBot;
        state.isRus = action.payload.isRus;
        state.maxBill = action.payload.maxBill;
        state.minBill = action.payload.minBill;
        state.isLoading = false;
      })
      .addCase(globalActions.checkAuth.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(globalActions.editSettings.fulfilled, (state, action) => {
        state.theme = action.payload.isDark ? 'dark' : 'light';
        state.linkBot = action.payload.linkBot;
        state.isRus = action.payload.isRus;
        state.minBill = action.payload.minBill;
        state.maxBill = action.payload.maxBill;
        state.filters = {
          ...state.filters,
          range: {
            min: action.payload.minBill,
            max: action.payload.minBill + (action.payload.maxBill - action.payload.minBill) / 2,
          },
        };
      })

      .addCase(globalActions.uploadAvatar.pending, (state) => {
        state.isAvatarLoading = true;
      })
      .addCase(globalActions.uploadAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload;
        state.isAvatarLoading = false;

        Nottification({
          avatar: action.payload.publicUrl,
          text: 'Avatar successfully upload',
        });
      })
      .addCase(globalActions.uploadAvatar.rejected, (state) => {
        state.isAvatarLoading = false;
      });
  },
});

export const globalReducer = globalSlice.reducer;
export const globalSettingActions = globalSlice.actions;
