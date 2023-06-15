import { configureStore } from '@reduxjs/toolkit';
import userCountReducer from './app/redux/getUserCount';

import getAdminProfileDataReducer from './app/redux/getAdminProfileDataSlice';
import getHeaderNotificationReducer from './app/redux/getHeaderNotificationSlice';
import getManageAccountsDataReducer from './app/redux/getManageAccountsDataSlice';
import getMarketPlaceSaleTypeReducer from './app/redux/getMarketPlaceSaleTypeSlice';
import getNewNftCollectionReducer from './app/redux/getNewNftCollectionSlice';
import getNewNftDefaultTemplateReducer from './app/redux/getNewNftDefaultTemplateSlice';
import getNewNftPropertiesReducer from './app/redux/getNewNftPropertiesSlice';
import getSuperAdminAccountsReducer from './app/redux/getSuperAdminAccountsSlice';
import getSuperAdminsCountsReducer from './app/redux/getSuperAdminsCountsSlice';
import UserProfileReducer from './app/redux/getUserProfileSlice';
import getVerifiedAccountsDataReducer from './app/redux/getVerifiedAccountsDataSlice';
export const store = configureStore({
  reducer: {
    userCount: userCountReducer,
    userProfile: UserProfileReducer,
    NewNftCollection: getNewNftCollectionReducer,
    defaultTemplate: getNewNftDefaultTemplateReducer,
    newNftProperties: getNewNftPropertiesReducer,
    marketPlaceSaleType: getMarketPlaceSaleTypeReducer,
    getAdminProfileData: getAdminProfileDataReducer,
    getHeaderNotification: getHeaderNotificationReducer,
    getSuperAdminsCounts: getSuperAdminsCountsReducer,
    getVerifiedAccountsData: getVerifiedAccountsDataReducer,
    getManageAccountsData: getManageAccountsDataReducer,
    getSuperAdminAccounts: getSuperAdminAccountsReducer,
  },
});
