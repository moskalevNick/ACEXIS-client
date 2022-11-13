import { ExisType } from './../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ExisService from '../../services/ExisService';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';

export const exisActions = {
  getExis: createAsyncThunk(
    getActionName(modules.EXIS, actionNames[modules.EXIS].getExis),
    async (id: string) => await ExisService.getExis(id),
  ),

  editExis: createAsyncThunk(
    getActionName(modules.EXIS, actionNames[modules.EXIS].editExis),
    async (newExis: ExisType) => await ExisService.editExis(newExis),
  ),

  createExis: createAsyncThunk(
    getActionName(modules.EXIS, actionNames[modules.EXIS].createExis),
    async (newExis: ExisType) => await ExisService.createExis(newExis),
  ),

  deleteExis: createAsyncThunk(
    getActionName(modules.EXIS, actionNames[modules.EXIS].deleteExis),
    async (id: string) => await ExisService.deleteExis(id),
  ),
};
