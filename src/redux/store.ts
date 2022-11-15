import { exisReducer } from './exis/reducers';
import { clientReducer } from './clients/reducers';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { globalReducer } from './global/reducer';
import { avatarReducer } from './avatar/reducers';

const rootReducer = combineReducers({
  globalReducer,
  clientReducer,
  exisReducer,
  avatarReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
