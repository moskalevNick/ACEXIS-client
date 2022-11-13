import { AvatarType } from './../types';
import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { avatarActions } from './actions';

const avatarSlice = createSlice({
  name: modules.AVATAR,
  initialState: {
    avatars: [] as AvatarType[],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(avatarActions.getAvatars.fulfilled, (state, action) => {
      state.avatars = [...state.avatars, action.payload];
    });
  },
});

export const avatarReducer = avatarSlice.reducer;
