import { Nottification } from './../../components/Nottification/Nottification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { UserType } from '../../types';
import UserService from '../../services/UserService';
import i18next from 'i18next';

type authType = {
  username: string;
  password: string;
  isRemember: boolean;
};
type registrationType = {
  username: string;
  password: string;
  cameraToken: string;
};

export const globalActions = {
  login: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].login),
    async ({ username, password, isRemember }: authType) => {
      try {
        const response = await AuthService.login(username, password);
        localStorage.setItem('access-token', response.data.accessToken);
        if (isRemember) {
          localStorage.setItem('refresh-token', response.data.refreshToken);
        }
        return {
          isAuth: true,
          ...response.data,
        };
      } catch (e) {
        const locale = i18next.resolvedLanguage;
        const nottificationText: string =
          locale === 'ru'
            ? 'Ошибка при входе в аккаунт'
            : 'There was a problem with your login or password';

        Nottification({
          text: nottificationText,
        });
        return {
          isAuth: false,
        };
      }
    },
  ),

  registration: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].registration),
    async ({ username, password, cameraToken }: registrationType) => {
      const response = await AuthService.registration(username, password, cameraToken);
      return response.data;
    },
  ),

  checkAuth: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].checkAuth),
    async () => {
      const refreshToken = localStorage.getItem('refresh-token');
      if (!refreshToken) {
        return false;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
        refreshToken,
      });

      localStorage.setItem('access-token', response.data.accessToken);
      return {
        isAuth: true,
        ...response.data.user,
      };
    },
  ),

  logout: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].logout),
    async () => {
      const refreshToken = localStorage.getItem('refresh-token');
      let response;
      if (refreshToken) {
        response = await AuthService.logout(refreshToken);
      } else {
        localStorage.removeItem('access-token');
        window.location.href = '/';
      }

      if (response?.status === 201) {
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('access-token');
        window.location.href = '/';
      }

      return true;
    },
  ),

  editSettings: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].edit),
    async (newUser: UserType) => {
      return await UserService.editUser(newUser);
    },
  ),

  uploadAvatar: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].uploadAvatar),
    async (image: File) => await UserService.uploadAvatar(image),
  ),
};
