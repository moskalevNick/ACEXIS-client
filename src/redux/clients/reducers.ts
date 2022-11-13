import { ClientType } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { clientActions } from './actions';

const clientSlice = createSlice({
  name: modules.CLIENTS,
  initialState: {
    clients: [] as ClientType[],
    client: {} as ClientType,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(clientActions.getClients.fulfilled, (state, action) => {
      state.clients = action.payload;
    });
    builder.addCase(clientActions.getClient.fulfilled, (state, action) => {
      state.client = action.payload;
    });
    builder.addCase(clientActions.editClient.fulfilled, (state, action) => {
      state.client = action.payload;
    });
  },
});

export const clientReducer = clientSlice.reducer;
