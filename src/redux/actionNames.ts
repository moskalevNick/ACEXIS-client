import { modules } from './modules';

export const actionNames = {
  [modules.CLIENTS]: {
    getClients: 'GET_CLIENTS',
    getClient: 'GET_CLIENT',
    editClient: 'EDIT_CLIENT',
    addClient: 'ADD_CLIENT',
    deleteClient: 'DELETE_CLIENT',
    deleteSimilar: 'DELETE_SIMILAR',
    deleteSimilarImage: 'DELETE_SIMILAR_IMAGE',
  },
  [modules.EXIS]: {
    getExis: 'GET_EXIS',
    editExis: 'EDIT_EXIS',
    createExis: 'CREATE_EXIS',
    deleteExis: 'DELETE_EXIS',
  },
  [modules.VISIT]: {
    getVisits: 'GET_VISITS',
    updateVisit: 'UPDATE_VISIT',
    deleteVisit: 'DELETE_VISIT',
  },
  [modules.IMAGE]: {
    getImages: 'GET_IMAGES',
    uploadImage: 'UPLOAD_IMAGE',
    deleteImage: 'DELETE_IMAGE',
    getCameraFrame: 'GET_CAMERA_FRAME',
    createImage: 'CREATE_IMAGE',
  },
  [modules.GLOBAL]: {
    login: 'LOGIN',
    registration: 'REGISTRATION',
    logout: 'LOGOUT',
    checkAuth: 'CHECK_AUTH',
    edit: 'EDIT_USER',
    uploadAvatar: 'UPLOAD_AVATAR',
  },
};
