import { configureStore } from '@reduxjs/toolkit';
import pinReducer from './reducers/pinReducer';

export const store = configureStore({
  reducer: {
    pinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
