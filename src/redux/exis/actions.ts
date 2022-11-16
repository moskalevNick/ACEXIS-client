import { CreateExisType, EditExisType } from './../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ExisService from '../../services/ExisService';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';

export const exisActions = {
  getExises: createAsyncThunk(
    getActionName(modules.EXIS, actionNames[modules.EXIS].getExis),
    async (clientId: string) => await ExisService.getExises(clientId),
  ),

  editExis: createAsyncThunk(
    getActionName(modules.EXIS, actionNames[modules.EXIS].editExis),
    async (newExis: EditExisType) => await ExisService.editExis(newExis),
  ),

  createExis: createAsyncThunk(
    getActionName(modules.EXIS, actionNames[modules.EXIS].createExis),
    async (newExis: CreateExisType) => await ExisService.createExis(newExis),
  ),

  deleteExis: createAsyncThunk(
    getActionName(modules.EXIS, actionNames[modules.EXIS].deleteExis),
    async (id: string) => await ExisService.deleteExis(id),
  ),
};
