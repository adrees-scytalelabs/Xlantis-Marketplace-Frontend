import { configureStore } from '@reduxjs/toolkit';
import countReducer from './app/redux/getCountSlice';

import userCountReducer from './app/redux/getUserCount';
import UserProfileReducer from './app/redux/getUserProfileSlice';
export const store = configureStore({
  reducer: {
    count:countReducer,
    userCount:userCountReducer,
    userProfile:UserProfileReducer
  },
});
