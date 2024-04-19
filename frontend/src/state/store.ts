import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './character/characterSlice';
import globalDataReducer from './character/globalDataSlice';

export const store = configureStore({
  reducer: {
    character: characterReducer,
    globalData: globalDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
