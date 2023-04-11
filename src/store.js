import { configureStore } from '@reduxjs/toolkit';
import countReducer from './app/redux/getCountSlice';
export const store = configureStore({
  reducer: {
    count:countReducer
  },
});
