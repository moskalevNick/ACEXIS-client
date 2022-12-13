import { VisitsType, UpdateVisitType } from './../../types';
import { CreateExisType, EditExisType } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ExisService from '../../services/ExisService';
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
};
