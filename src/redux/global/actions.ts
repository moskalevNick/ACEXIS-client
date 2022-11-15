import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import AuthService from '../../services/AuthService';
import axios from 'axios';

type authType = {
  username: string;
  password: string;
};

export const globalActions = {
  login: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].login),
    async ({ username, password }: authType) => {
      const response = await AuthService.login(username, password);
      localStorage.setItem('access-token', response.data.accessToken);
      localStorage.setItem('refresh-token', response.data.refreshToken);
      // cookies.
      return true;
    },
  ),

  checkAuth: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].checkAuth),
    async () => {
      const refreshToken = localStorage.getItem('refresh-token');

      if (!refreshToken) {
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/refresh`, {
        refreshToken,
      });

      localStorage.setItem('access-token', response.data.accessToken);
      console.log('response', response);

      return true;
    },
  ),
};
