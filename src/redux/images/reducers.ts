import { createSlice } from '@reduxjs/toolkit';
import { ImageType } from './../types';
import { modules } from '../modules';
import { imagesActions } from './actions';
import { Nottification } from '../../components/Nottification/Nottification';

const imageSlice = createSlice({
  name: modules.IMAGE,
  initialState: {
    images: [] as ImageType[],
    avatar: {} as ImageType | null,
    isLoading: false,
  },
  reducers: {
    clearState: (state) => {
      state.images = [];
      state.avatar = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(imagesActions.getImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(imagesActions.getImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.avatar = action.payload[action.payload.length - 1];
        state.isLoading = false;
      })
      .addCase(imagesActions.getImages.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(imagesActions.uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(imagesActions.uploadImage.fulfilled, (state, action) => {
        state.images = [...state.images, action.payload];
        state.isLoading = false;

        Nottification({
          avatar: action.payload.publicUrl,
          text: 'Image successfully upload',
        });
      })
      .addCase(imagesActions.uploadImage.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(imagesActions.deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(imagesActions.deleteImage.fulfilled, (state, action) => {
        state.images = state.images.filter((el) => el.id !== action.payload.id);
        state.isLoading = false;
        Nottification({
          avatar: action.payload.publicUrl,
          text: 'Image successfully deleted',
        });
      })
      .addCase(imagesActions.deleteImage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const imageReducer = imageSlice.reducer;
export const imageSettingsActions = imageSlice.actions;
