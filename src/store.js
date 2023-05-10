import { configureStore } from '@reduxjs/toolkit';
import userCountReducer from './app/redux/getUserCount';
import myNftReducer from './app/redux/myNftSlice';

import getAdminProfileDataReducer from './app/redux/getAdminProfileDataSlice';
import getHeaderNotificationReducer from './app/redux/getHeaderNotificationSlice';
import getManageAccountsDataReducer from './app/redux/getManageAccountsDataSlice';
import getMarketPlaceDataReducer from './app/redux/getMarketPlaceDataSlice';
import getMarketPlaceSaleTypeReducer from './app/redux/getMarketPlaceSaleTypeSlice';
import getMyCollectionReducer from './app/redux/getMyCollectionSlice';
import getMyDropsReducer from './app/redux/getMyDropsSlice';
import getNewNftCollectionReducer from './app/redux/getNewNftCollectionSlice';
import getNewNftDefaultTemplateReducer from './app/redux/getNewNftDefaultTemplateSlice';
import getNewNftPropertiesReducer from './app/redux/getNewNftPropertiesSlice';
import getSavedTemplateDataReducer from './app/redux/getSavedTemplateDataSlice';
import getSuperAdminAccountsReducer from './app/redux/getSuperAdminAccountsSlice';
import getSuperAdminsCountsReducer from './app/redux/getSuperAdminsCountsSlice';
import getUnverifiedAccountsDataReducer from './app/redux/getUnverifiedAccountsDataSLice';
import UserProfileReducer from './app/redux/getUserProfileSlice';
import getVerifiedAccountsDataReducer from './app/redux/getVerifiedAccountsDataSlice';
export const store = configureStore({
  reducer: {
    userCount: userCountReducer,
    userProfile: UserProfileReducer,
    MyCollection: getMyCollectionReducer,
    NewNftCollection: getNewNftCollectionReducer,
    defaultTemplate: getNewNftDefaultTemplateReducer,
    newNftProperties: getNewNftPropertiesReducer,
    marketPlaceSaleType: getMarketPlaceSaleTypeReducer,
    getMyDrops: getMyDropsReducer,
    myNft: myNftReducer,
    getAdminProfileData: getAdminProfileDataReducer,
    getHeaderNotification: getHeaderNotificationReducer,
    getSuperAdminsCounts: getSuperAdminsCountsReducer,
    getMarketPlaceData: getMarketPlaceDataReducer,
    getVerifiedAccountsData: getVerifiedAccountsDataReducer,
    getManageAccountsData: getManageAccountsDataReducer,
    getSuperAdminAccounts: getSuperAdminAccountsReducer,
    getSavedTemplateData: getSavedTemplateDataReducer,
    getUnverifiedAccountsData: getUnverifiedAccountsDataReducer
  },
});
