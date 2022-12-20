import { threeHoursAgo } from './../../helpers/constants';
import { exisActions } from './../exis/actions';
import { VisitsType } from './../../types';
import { ClientType } from '../../types';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { visitActions } from './actions';
import { clientActions } from '../clients/actions';
import { RootStateExtended } from '../store';

export type LastVisitType = Record<string, VisitsType | undefined>;

const visitSlice = createSlice({
  name: modules.VISIT,
  initialState: {
    visits: [] as VisitsType[],
    lastVisits: {} as LastVisitType,
  },
  reducers: {
    clearVisits: (state) => {
      state.visits = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(clientActions.getClients.fulfilled, (state, action: PayloadAction<ClientType[]>) => {
        action.payload.forEach((client) => {
          if (client.visits?.length) {
            let lastVisit: VisitsType | undefined;
            client.visits.forEach((visit) => {
              if (lastVisit) {
                if (lastVisit.date < visit.date) {
                  lastVisit = visit;
                }
              } else {
                lastVisit = visit;
              }
            });
            if (lastVisit) {
              state.lastVisits[client.id] = lastVisit;
            }
          }
        });
      })
      .addCase(exisActions.createExis.fulfilled, (state, action) => {
        if (state.visits.length) {
          let lastClientVisit: VisitsType = state.visits[0];

          const currentState = current(state.visits);
          currentState.forEach((visit) => {
            if (!lastClientVisit) {
              lastClientVisit = visit;
            } else {
              if (visit.date > lastClientVisit.date) {
                lastClientVisit = visit;
              }
            }
          });

          if (lastClientVisit && new Date(lastClientVisit.date) > threeHoursAgo) {
            const visits = current(state.visits);
            const newVisits = visits.filter((visit) => visit.id !== lastClientVisit?.id);

            const newExises: string[] = Object.assign([], lastClientVisit.exisId);

            newExises.push(action.payload.id);
            lastClientVisit = { ...lastClientVisit, exisId: newExises };
            newVisits.push(lastClientVisit);

            state.visits = newVisits;
          }
        }
      })

      .addCase(exisActions.deleteExis.fulfilled, (state, action) => {
        const currentVisits = current(state.visits);

        if (currentVisits.length) {
          const visit = currentVisits.find((visit) => visit.id === action.payload.visitId);
          if (visit) {
            const index = currentVisits.indexOf(visit);

            if (index !== -1) {
              const newExisIds = visit.exisId.filter((el) => el !== action.payload.id);

              const newVisit = {
                ...currentVisits[index],
                exisId: newExisIds,
              };

              const newVisits = currentVisits.filter((el) => el.id !== action.payload.visitId);
              newVisits.push(newVisit);

              state.visits = newVisits;
            }
          }
        }
      })

      .addCase(visitActions.getVisits.fulfilled, (state, action) => {
        state.visits = action.payload;
      });
  },
});

export const visitReducer = visitSlice.reducer;
export const visitSettingsActions = visitSlice.actions;

export const selectVisits = (state: RootStateExtended<typeof visitSlice>) =>
  state.visitReducer.visits;
