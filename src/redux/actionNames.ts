import { modules } from './modules';

export const actionNames = {
  [modules.CLIENTS]: {
    getClients: 'GET_CLIENTS',
    getClient: 'GET_CLIENT',
    editClient: 'EDIT_CLIENT',
    uploadImage: 'UPLOAD_IMAGE',
  },
  [modules.EXIS]: {
    getExis: 'GET_EXIS',
    editExis: 'EDIT_EXIS',
    createExis: 'CREATE_EXIS',
    deleteExis: 'DELETE_EXIS',
  },
  [modules.IMAGE]: {
    getImages: 'GET_IMAGES',
    uploadImage: 'UPLOAD_IMAGE',
    deleteImage: 'DELETE_IMAGE',
  },
  [modules.GLOBAL]: {
    setTheme: 'SET_THEME',
    setFSCamera: 'SET_FS_CAMERA',
    setRussian: 'SET_RUSSIAN',
    login: 'LOGIN',
    logout: 'LOGOUT',
    checkAuth: 'CHECK_AUTH',
  },
};
