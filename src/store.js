import { configureStore } from '@reduxjs/toolkit';
import countReducer from './app/redux/getCountSlice';
import userCountReducer from './app/redux/getUserCount';
import myNftReducer from './app/redux/myNftSlice';

import getMarketPlaceSaleTypeReducer from './app/redux/getMarketPlaceSaleTypeSlice';
import getMyCollectionReducer from './app/redux/getMyCollectionSlice';
import getNewNftCollectionReducer from './app/redux/getNewNftCollectionSlice';
import getNewNftDefaultTemplateReducer from './app/redux/getNewNftDefaultTemplateSlice';
import getNewNftPropertiesReducer from './app/redux/getNewNftPropertiesSlice';
import UserProfileReducer from './app/redux/getUserProfileSlice';
import getAdminProfileDataReducer from './app/redux/getAdminProfileDataSlice';
import getHeaderNotificationReducer from './app/redux/getHeaderNotificationSlice';
import getVerifiedAccountsDataReducer from './app/redux/getVerifiedAccountsDataSlice';
import getManageAccountsDataReducer from './app/redux/getManageAccountsDataSlice';
import getSuperAdminAccountsReducer from './app/redux/getSuperAdminAccountsSlice';
import getSavedTemplateDataReducer from './app/redux/getSavedTemplateDataSlice';
import getUnverifiedAccountsDataReducer from './app/redux/getUnverifiedAccountsDataSLice';
export const store = configureStore({
  reducer: {
    count: countReducer,
    userCount: userCountReducer,
    userProfile: UserProfileReducer,
    myNft: myNftReducer,
    MyCollection: getMyCollectionReducer,
    NewNftCollection: getNewNftCollectionReducer,
    defaultTemplate: getNewNftDefaultTemplateReducer,
    newNftProperties: getNewNftPropertiesReducer,
    marketPlaceSaleType: getMarketPlaceSaleTypeReducer,
    getAdminProfileData:getAdminProfileDataReducer,
    getHeaderNotification:getHeaderNotificationReducer,
    getVerifiedAccountsData:getVerifiedAccountsDataReducer,
    getManageAccountsData:getManageAccountsDataReducer,
    getSuperAdminAccounts:getSuperAdminAccountsReducer,
    getSavedTemplateData:getSavedTemplateDataReducer,
    getUnverifiedAccountsData:getUnverifiedAccountsDataReducer
  },
});
