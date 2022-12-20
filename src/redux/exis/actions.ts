import { visitActions } from './../visit/actions';
import { UpdateVisitType, VisitsType } from './../../types';
import { threeHoursAgo } from './../../helpers/constants';
import { selectVisits } from './../visit/reducers';
import { CreateExisType, EditExisType } from '../../types';
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
    async (newExis: CreateExisType, thunkApi) => {
      const data = await ExisService.createExis(newExis);

      const state: any = thunkApi.getState();
      const visits: VisitsType[] = selectVisits(state);

      let lastClientVisit: VisitsType = visits[0];
      visits.forEach((visit) => {
        if (!lastClientVisit) {
          lastClientVisit = visit;
        } else {
          if (visit.date > lastClientVisit.date) {
            lastClientVisit = visit;
          }
        }
      });
      if (
        lastClientVisit &&
        lastClientVisit.date &&
        lastClientVisit.id &&
        new Date(lastClientVisit.date) > threeHoursAgo
      ) {
        const newExises = [...lastClientVisit.exisId, data.id];

        const visitId = lastClientVisit.id;
        const updateVisitDto: UpdateVisitType = {
          date: lastClientVisit.date,
          exisId: newExises,
        };

        thunkApi.dispatch(
          visitActions.updateVisit({
            id: visitId,
            newVisit: updateVisitDto,
          }),
        );
      }

      return data;
    },
  ),

  deleteExis: createAsyncThunk(
    getActionName(modules.EXIS, actionNames[modules.EXIS].deleteExis),
    async (id: string, thunkApi) => {
      const data = await ExisService.deleteExis(id);

      const state: any = thunkApi.getState();
      const visits: VisitsType[] = selectVisits(state);

      const currentVisit = visits.find((visit) => visit.exisId.includes(data.id));

      if (currentVisit) {
        const newExisIds = currentVisit.exisId.filter((id) => id !== data.id);

        const updateVisitDto: UpdateVisitType = {
          date: currentVisit.date,
          exisId: newExisIds,
        };

        thunkApi.dispatch(
          visitActions.updateVisit({
            id: currentVisit.id,
            newVisit: updateVisitDto,
          }),
        );
      }

      return data;
    },
  ),
};
