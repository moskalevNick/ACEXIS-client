import { createAsyncThunk } from '@reduxjs/toolkit';
import ClientsService from '../../services/ClientService';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import { ClientType } from '../types';

export const clientActions = {
  getClients: createAsyncThunk(
    getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].getClients),
    async () => {
      const data = await ClientsService.getClients();
      return data;
    },
  ),

  getClient: createAsyncThunk(
    getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].getClient),
    async (id: string) => {
      const data = await ClientsService.getClient(id);
      return data;
    },
  ),

  editClient: createAsyncThunk(
    getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].editClient),
    async (newClient: ClientType) => {
      const data = await ClientsService.editClient(newClient);
      const client = await ClientsService.getClient(data.id);
      return client;
    },
  ),
};
