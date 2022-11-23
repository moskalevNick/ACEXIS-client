import { ClientType, ImageType } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { clientActions } from './actions';
import { Nottification } from '../../components/Nottification/Nottification';

const clientSlice = createSlice({
  name: modules.CLIENTS,
  initialState: {
    clients: [] as ClientType[],
    currentClient: null as ClientType | null,
    // newClient: null as ClientType | null,
    // images: [] as ImageType[],
    isLoading: false,
    isClientLoading: false,
  },
  reducers: {
    setCurrentClient: (state, action) => {
      state.currentClient = action.payload;
    },
    clearCurrentClient: (state) => {
      state.currentClient = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(clientActions.getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clientActions.getClients.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.isLoading = false;
      })
      .addCase(clientActions.getClients.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(clientActions.getClient.pending, (state) => {
        state.isClientLoading = true;
      })
      .addCase(clientActions.getClient.fulfilled, (state, action) => {
        state.currentClient = action.payload;
        state.isClientLoading = false;
      })
      .addCase(clientActions.getClient.rejected, (state) => {
        state.isClientLoading = false;
      })

      .addCase(clientActions.editClient.pending, (state) => {
        state.isClientLoading = true;
      })
      .addCase(clientActions.editClient.fulfilled, (state, action) => {
        state.currentClient = action.payload;

        const replacableIndex = state.clients.findIndex(
          (client) => client.id === action.payload.id,
        );
        state.clients[replacableIndex] = action.payload;

        state.isClientLoading = false;

        let avatar: string = '';
        if (action.payload.images?.length) {
          avatar = action.payload.images[action.payload.images.length - 1].publicUrl;
        }

        Nottification({
          name: action.payload.name,
          avatar: avatar,
          text: 'This client successfully updated',
        });
      })
      .addCase(clientActions.editClient.rejected, (state) => {
        state.isClientLoading = false;
      })

      .addCase(clientActions.addClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clientActions.addClient.fulfilled, (state, action) => {
        state.currentClient = action.payload;
        state.isLoading = false;
      })
      .addCase(clientActions.addClient.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(clientActions.deleteClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clientActions.deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter((el) => el.id !== action.payload.id);
        state.isLoading = false;
      })
      .addCase(clientActions.deleteClient.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const clientReducer = clientSlice.reducer;
export const clientSettingsActions = clientSlice.actions;
