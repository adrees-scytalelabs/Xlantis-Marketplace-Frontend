import { configureStore } from '@reduxjs/toolkit';
import countReducer from './app/redux/getCountSlice';

import userCountReducer from './app/redux/getUserCount';
export const store = configureStore({
  reducer: {
    count:countReducer,
    userCount:userCountReducer
  },
});
