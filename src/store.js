import { configureStore } from '@reduxjs/toolkit';
import countReducer from './app/redux/getCountSlice';
import userCountReducer from './app/redux/getUserCount';
import myNftReducer from './app/redux/myNftSlice';

export const store = configureStore({
  reducer: {
    count: countReducer,
    myNft: myNftReducer,
    userCount: userCountReducer
  },
});
