import { configureStore } from '@reduxjs/toolkit';
import countReducer from './app/redux/getCountSlice';

import userCountReducer from './app/redux/getUserCount';
import UserProfileReducer from './app/redux/getUserProfileSlice';
import getMyCollectionReducer from './app/redux/getMyCollectionSlice';
import getNewNftCollectionReducer from './app/redux/getNewNftCollectionSlice';
import getNewNftDefaultTemplateReducer from './app/redux/getNewNftDefaultTemplateSlice';
import getNewNftPropertiesReducer from './app/redux/getNewNftPropertiesSlice';
import getMarketPlaceSaleTypeReducer from './app/redux/getMarketPlaceSaleTypeSlice';
export const store = configureStore({
  reducer: {
    count:countReducer,
    userCount:userCountReducer,
    userProfile:UserProfileReducer,
    MyCollection:getMyCollectionReducer,
    NewNftCollection:getNewNftCollectionReducer,
    defaultTemplate:getNewNftDefaultTemplateReducer,
    newNftProperties:getNewNftPropertiesReducer,
    marketPlaceSaleType:getMarketPlaceSaleTypeReducer
  },
});
