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
    images: {} as ImagesType,
    avatar: {} as ImageType | null,
    cameraFrame: null as CameraFrameType | null,
    isFaceOnCamera: false,
    isLoading: false,
  },
  reducers: {
    clearState: (state) => {
      state.avatar = null;
    },
    resetCameraFrame: (state) => {
      state.cameraFrame = null;
    },
    resetFaceOnCamera: (state) => {
      state.isFaceOnCamera = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(clientActions.getClients.fulfilled, (state, action: PayloadAction<ClientType[]>) => {
        action.payload.forEach((client) => {
          if (client.images) {
            state.images[client.id] = client.images;
          }
        });
      })

      .addCase(clientActions.getClient.fulfilled, (state, action: PayloadAction<ClientType>) => {
        if (action.payload.images) {
          state.images[action.payload.id] = action.payload.images;
        }
      })

      .addCase(imagesActions.getImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(imagesActions.getImages.fulfilled, (state, action) => {
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
        const key = action.payload.clientId;
        if (!state.images[key] || !state.images[key].length) {
          state.images = {
            ...state.images,
            [key]: [action.payload],
          };
        } else {
          state.images = {
            ...state.images,
            [key]: [...state.images[key], action.payload],
          };
        }
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
        const key = action.payload.clientId;

        state.images = {
          ...state.images,
          [key]: state.images[key].filter((image) => image.id !== action.payload.id),
        };

        state.isLoading = false;
        Nottification({
          avatar: action.payload.publicUrl,
          text: 'Image successfully deleted',
        });
      })
      .addCase(imagesActions.deleteImage.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(imagesActions.getStream.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(imagesActions.getStream.fulfilled, (state, action) => {
        state.cameraFrame = action.payload[0];

        if (action.payload[0] && action.payload[0].faces && action.payload[0].faces.length) {
          state.isFaceOnCamera = true;
        } else {
          state.isFaceOnCamera = false;
        }

        state.isLoading = false;
      })
      .addCase(imagesActions.getStream.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const imageReducer = imageSlice.reducer;
export const imageSettingsActions = imageSlice.actions;
