import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { UserType } from '../../types';
import UserService from '../../services/UserService';

type authType = {
  username: string;
  password: string;
  isRemember: boolean;
};

export const globalActions = {
  login: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].login),
    async ({ username, password, isRemember }: authType) => {
      const response = await AuthService.login(username, password);
      localStorage.setItem('access-token', response.data.accessToken);
      if (isRemember) {
        localStorage.setItem('refresh-token', response.data.refreshToken);
      }
      return {
        isAuth: true,
        ...response.data,
      };
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
      const data = await UserService.editUser(newUser);
      return data;
    },
  ),

  uploadAvatar: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].uploadAvatar),
    async (image: File) => await UserService.uploadAvatar(image),
  ),
};
