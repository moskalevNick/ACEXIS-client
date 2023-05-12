import { UpdateVisitType } from './../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import VisitService from '../../services/VisitService';

export const visitActions = {
  getVisits: createAsyncThunk(
    getActionName(modules.VISIT, actionNames[modules.VISIT].getVisits),
    async (clientId: string) => await VisitService.getVisits(clientId),
  ),

  updateVisit: createAsyncThunk(
    getActionName(modules.VISIT, actionNames[modules.VISIT].updateVisit),
    async ({ id, newVisit }: { id: string; newVisit: UpdateVisitType }) =>
      await VisitService.updateVisit(id, newVisit),
  ),

  deleteVisit: createAsyncThunk(
    getActionName(modules.VISIT, actionNames[modules.VISIT].deleteVisit),
    async (id: string) => await VisitService.deleteVisit(id),
  ),
};
