import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';

import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { messageReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
