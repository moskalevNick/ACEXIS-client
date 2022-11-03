import { RootState } from '../store';
import { SET_FS_CAMERA, SET_RUSSIAN, SET_THEME } from './actions/globalActions';
import { ActionType, State, Theme } from './types';

const initialState: State = {
  theme: 'light',
  isFullScreenCameraOpen: false,
  isRussian: false,
};

export default function globalReducer(state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_FS_CAMERA:
      return { ...state, isFullScreenCameraOpen: action.payload };
    case SET_RUSSIAN:
      return { ...state, isRussian: action.payload };
    default:
      return state;
  }
}

export const setTheme = (value: Theme) => ({
  type: SET_THEME,
  payload: value,
});

export const setFSCameraOpen = (value: boolean) => ({
  type: SET_FS_CAMERA,
  payload: value,
});

export const setRussian = (value: boolean) => ({
  type: SET_RUSSIAN,
  payload: value,
});

export const selectTheme = (store: RootState) => store.globalReducer.theme;
export const selectFSCamera = (store: RootState) => store.globalReducer.isFullScreenCameraOpen;
export const selectIsRussian = (store: RootState) => store.globalReducer.isRussian;
