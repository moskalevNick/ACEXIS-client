import { createAsyncThunk } from '@reduxjs/toolkit';
import AvatarService from '../../services/AvatarService';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';

export const avatarActions = {
  getAvatars: createAsyncThunk(
    getActionName(modules.AVATAR, actionNames[modules.AVATAR].getAvatar),

    async (id: string) => await AvatarService.getAvatar(id),
  ),
};
