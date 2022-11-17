import { ClientType, ImageType } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { clientActions } from './actions';

const clientSlice = createSlice({
  name: modules.CLIENTS,
  initialState: {
    clients: [] as ClientType[],
    client: {} as ClientType,
    images: [] as ImageType[],
    isLoading: false,
    isClientLoading: false,
  },
  reducers: {},

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
        state.client = action.payload;
        state.isClientLoading = false;
      })
      .addCase(clientActions.getClient.rejected, (state) => {
        state.isClientLoading = false;
      })

      .addCase(clientActions.editClient.pending, (state) => {
        state.isClientLoading = true;
      })
      .addCase(clientActions.editClient.fulfilled, (state, action) => {
        state.client = action.payload;
        state.isClientLoading = false;
      })
      .addCase(clientActions.editClient.rejected, (state) => {
        state.isClientLoading = false;
      });
  },
});

export const clientReducer = clientSlice.reducer;
