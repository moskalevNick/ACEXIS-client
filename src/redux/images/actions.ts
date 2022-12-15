import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import ImageService from '../../services/ImageService';

type uploadImageType = {
  clientId: string;
  image: File;
};

export const imagesActions = {
  getImages: createAsyncThunk(
    getActionName(modules.IMAGE, actionNames[modules.IMAGE].getImages),
    async (clientId: string) => await ImageService.getImages(clientId),
  ),
  uploadImage: createAsyncThunk(
    getActionName(modules.IMAGE, actionNames[modules.IMAGE].uploadImage),
    async ({ clientId, image }: uploadImageType) => await ImageService.uploadImage(clientId, image),
  ),
  deleteImage: createAsyncThunk(
    getActionName(modules.IMAGE, actionNames[modules.IMAGE].deleteImage),
    async (imageId: string) => await ImageService.deleteImage(imageId),
  ),
  getStream: createAsyncThunk(
    getActionName(modules.IMAGE, actionNames[modules.IMAGE].getCameraFrame),
    async (cameraToken: string) => await ImageService.getStream(cameraToken),
  ),
};
