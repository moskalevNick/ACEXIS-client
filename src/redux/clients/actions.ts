import { selectFilters } from './reducers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ClientsService from '../../services/ClientService';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import { ClientType, CreateClientType } from '../../types';

type editClientType = {
  newClient: CreateClientType;
  id: string;
};

export const clientActions = {
  getClients: createAsyncThunk(
    getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].getClients),
    async (_: void, thunkApi) => {
      const state: any = thunkApi.getState();
      const filters = selectFilters(state);

      const data = await ClientsService.getClients(filters);
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
    async ({ newClient, id }: editClientType) => {
      const data = await ClientsService.editClient(newClient, id);
      return data;
    },
  ),

  editClientWithoutUpdateRedux: createAsyncThunk(
    getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].editClientWithoutUpdateRedux),
    async ({ newClient, id }: editClientType) => {
      const data = await ClientsService.editClient(newClient, id);
      return data;
    },
  ),

  addClient: createAsyncThunk(
    getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].addClient),
    async (newClient: Omit<ClientType, 'id' | 'images'>): Promise<ClientType> => {
      const data = await ClientsService.addClient(newClient);
      return data;
    },
  ),

  deleteClient: createAsyncThunk(
    getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].deleteClient),
    async (id: string) => {
      const data = await ClientsService.deleteClient(id);
      return data;
    },
  ),

  deleteSimilar: createAsyncThunk(
    getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].deleteSimilar),
    async (id: string) => {
      const data = await ClientsService.deleteSimilar(id);
      return data;
    },
  ),

  deleteSimilarImage: createAsyncThunk(
    getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].deleteSimilarImage),
    async (id: string) => {
      const data = await ClientsService.deleteSimilarImage(id);
      return data;
    },
  ),
};
