import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CameraFrameType, ClientType, ImageType } from '../../types';
import { modules } from '../modules';
import { imagesActions } from './actions';
import { Nottification } from '../../components/Nottification/Nottification';
import { clientActions } from '../clients/actions';

type ImagesType = Record<string, Array<ImageType>>;

const imageSlice = createSlice({
  name: modules.IMAGE,
  initialState: {
    // images: [] as ImageType[],
    images: {} as ImagesType,
    avatar: {} as ImageType | null,
    cameraFrame: null as CameraFrameType | null,
    isLoading: false,
  },
  reducers: {
    clearState: (state) => {
      // state.images = [];
      state.avatar = null;
    },
    resetCameraFrame: (state) => {
      state.cameraFrame = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(clientActions.getClients.fulfilled, (state, action: PayloadAction<ClientType[]>) => {
        action.payload.forEach((client) => {
          state.images[client.id] = client.images;
        });
      })
      .addCase(clientActions.getClient.fulfilled, (state, action: PayloadAction<ClientType>) => {
        state.images[action.payload.id] = action.payload.images;
      })
      .addCase(imagesActions.getImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(imagesActions.getImages.fulfilled, (state, action) => {
        // state.images = action.payload;
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
        state.images = {
          ...state.images,
          [action.payload.clientId]: [...state.images[action.payload.clientId], action.payload],
        };
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
        // state.images = state.images.filter((el) => el.id !== action.payload.id);
        state.isLoading = false;
        Nottification({
          avatar: action.payload.publicUrl,
          text: 'Image successfully deleted',
        });
      })
      .addCase(imagesActions.deleteImage.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(imagesActions.getCameraFrame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(imagesActions.getCameraFrame.fulfilled, (state, action) => {
        state.cameraFrame = action.payload[0];
        state.isLoading = false;
      })
      .addCase(imagesActions.getCameraFrame.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const imageReducer = imageSlice.reducer;
export const imageSettingsActions = imageSlice.actions;
