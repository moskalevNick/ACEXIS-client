import { createSlice } from '@reduxjs/toolkit';
import { UserAvatarType } from './../../types';
import { modules } from '../modules';
import { globalActions } from './actions';
import { Nottification } from '../../components/Nottification/Nottification';

const globalSlice = createSlice({
  name: modules.GLOBAL,
  initialState: {
    role: 'user',
    isFullScreenCameraOpen: false,
    isRus: false,
    isAuth: false,
    isDark: false,
    chatId: null,
    maxBill: 0,
    minBill: 0,
    isLoading: false,
    isAvatarLoading: false,
    avatar: null as UserAvatarType | null,
    cameraToken: '',
  },
  reducers: {
    setFSCamera: (state, action) => {
      state.isFullScreenCameraOpen = action.payload;
    },
    setIsRussian: (state, action) => {
      state.isRus = action.payload;
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
        state.avatar = action.payload.avatar;
        state.isAuth = action.payload.isAuth;
        state.isDark = action.payload.isDark;
        state.chatId = action.payload.chatId;
        state.isRus = action.payload.isRus;
        state.maxBill = action.payload.maxBill;
        state.minBill = action.payload.minBill;
        state.role = action.payload.role;
        state.cameraToken = action.payload.cameraToken;
        state.isLoading = false;
      })
      .addCase(globalActions.login.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(globalActions.registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalActions.registration.fulfilled, (state, action) => {
        state.isLoading = false;
        Nottification({
          text: `user ${action.payload.username} successfully registered`,
        });
      })
      .addCase(globalActions.registration.rejected, (state) => {
        Nottification({
          text: 'there was a problem with registration',
        });
        state.isLoading = false;
      })

      .addCase(globalActions.checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalActions.checkAuth.fulfilled, (state, action) => {
        state.isAuth = action.payload.isAuth;
        state.avatar = action.payload.avatar;
        state.isDark = action.payload.isDark;
        state.chatId = action.payload.chatId;
        state.isRus = action.payload.isRus;
        document.body.setAttribute('dir', action.payload.isRus ? 'ru' : 'en');
        state.maxBill = action.payload.maxBill;
        state.minBill = action.payload.minBill;
        state.role = action.payload.role;
        state.cameraToken = action.payload.cameraToken;
        state.isLoading = false;
      })
      .addCase(globalActions.checkAuth.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(globalActions.editSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalActions.editSettings.fulfilled, (state, action) => {
        state.isDark = action.payload.isDark;
        state.chatId = action.payload.chatId;
        state.cameraToken = action.payload.cameraToken;
        state.isRus = action.payload.isRus;
        document.body.setAttribute('dir', action.payload.isRus ? 'ru' : 'en');
        state.minBill = action.payload.minBill;
        state.maxBill = action.payload.maxBill;
        Nottification({
          text: action.payload.isRus
            ? 'настройки аккаунта изменены успешно'
            : 'account settings changed successfully',
        });
        state.isLoading = false;
      })
      .addCase(globalActions.editSettings.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(globalActions.uploadAvatar.pending, (state) => {
        state.isAvatarLoading = true;
      })
      .addCase(globalActions.uploadAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload;
        state.isAvatarLoading = false;
        const isRus = state.isRus;
        Nottification({
          avatar: action.payload.publicUrl,
          text: isRus ? 'Фото профиля успешно обновлено' : 'Avatar successfully upload',
        });
      })
      .addCase(globalActions.uploadAvatar.rejected, (state) => {
        state.isAvatarLoading = false;
      });
  },
});

export const globalReducer = globalSlice.reducer;
export const globalSettingActions = globalSlice.actions;
