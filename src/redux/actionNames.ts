import { modules } from './modules';

export const actionNames = {
  [modules.CLIENTS]: {
    getClients: 'GET_CLIENTS',
    getClient: 'GET_CLIENT',
    editClient: 'EDIT_CLIENT',
    addClient: 'ADD_CLIENT',
    deleteClient: 'DELETE_CLIENT',
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
    getCameraFrame: 'GET_CAMERA_FRAME',
  },
  [modules.GLOBAL]: {
    login: 'LOGIN',
    logout: 'LOGOUT',
    checkAuth: 'CHECK_AUTH',
    edit: 'EDIT_USER',
    uploadAvatar: 'UPLOAD_AVATAR',
  },
};
