import { modules } from './modules';

export const actionNames = {
  [modules.CLIENTS]: {
    getClients: 'GET_CLIENTS',
    getClient: 'GET_CLIENT',
    editClient: 'EDIT_CLIENT',
  },
  [modules.EXIS]: {
    getExis: 'GET_EXIS',
    editExis: 'EDIT_EXIS',
    createExis: 'CREATE_EXIS',
    deleteExis: 'DELETE_EXIS',
  },
  [modules.AVATAR]: { getAvatar: 'GET_AVATAR' },
  [modules.GLOBAL]: {
    setTheme: 'SET_THEME',
    setFSCamera: 'SET_FS_CAMERA',
    setRussian: 'SET_RUSSIAN',
    login: 'LOGIN',
    checkAuth: 'CHECK_AUTH',
  },
};
