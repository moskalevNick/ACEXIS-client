import { ClientType, ExisType } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { exisActions } from './actions';
import { clientActions } from '../clients/actions';

type PinnedExisesType = Record<string, ExisType | undefined>;

const exisSlice = createSlice({
  name: modules.EXIS,
  initialState: {
    exises: [] as ExisType[],
    pinnedExis: {} as PinnedExisesType,
  },
  reducers: {
    clearExises: (state) => {
      state.exises = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(clientActions.getClients.fulfilled, (state, action: PayloadAction<ClientType[]>) => {
        action.payload.forEach((client) => {
          if (client.exises?.length) {
            client.exises.forEach((exis) => {
              if (exis.isPinned) {
                state.pinnedExis[client.id] = exis;
              }
            });
          }
        });
      })

      .addCase(exisActions.getExises.fulfilled, (state, action) => {
        state.exises = action.payload;
      })

      .addCase(exisActions.editExis.fulfilled, (state, action) => {
        const newArr = state.exises.filter((el) => el.id !== action.payload.id);
        newArr.push(action.payload);
        state.exises = newArr;

        if (action.payload.clientId) {
          if (
            !action.payload.isPinned &&
            action.payload.id === state.pinnedExis[action.payload.clientId]?.id
          ) {
            state.pinnedExis[action.payload.clientId] = undefined;
          }

          if (action.payload.isPinned) {
            state.pinnedExis[action.payload.clientId] = action.payload;
          }
        }
      })

      .addCase(exisActions.deleteExis.fulfilled, (state, action) => {
        const newArr = state.exises.filter((el) => el.id !== action.payload.id);
        state.exises = newArr;
        if (action.payload.isPinned && action.payload.clientId) {
          state.pinnedExis[action.payload.clientId] = undefined;
        }
      })
      .addCase(exisActions.createExis.fulfilled, (state, action) => {
        state.exises = [...state.exises, action.payload];
      });
  },
});

export const exisReducer = exisSlice.reducer;
export const exisSettingsActions = exisSlice.actions;
