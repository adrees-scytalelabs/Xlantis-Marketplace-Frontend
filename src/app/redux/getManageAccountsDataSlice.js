import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  enabledType1Data:[],
  enabledType1Loading:0,
  enabledType2Data:[],
  enabledType2Loading:0,
  disabledType1Data:[],
  disabledType1Loading:0,
  disabledType2Data:[],
  disabledType2Loading:0

};

export const getSuperAdminEnabledType1 = createAsyncThunk(
  'superAdmin/getSuperAdminEnabledType1',
  async (thunkAPI) => {
    try {
      const resp = await axios(`/super-admin/admins/enabled?userType=v1`);
    //   console.log("reduxResp",resp);

      return resp.data;
    } catch (error) {
        console.log(error.response.data);
        if (error.response.data !== undefined) {
          if (error.response.data === "Unauthorized access (invalid token) !!") {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");
            window.location.reload(false);
          }
        }
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getSuperAdminEnabledType2 = createAsyncThunk(
    'superAdmin/getSuperAdminEnabledType2',
    async (thunkAPI) => {
      try {
        const resp = await axios(`/super-admin/admins/enabled?userType=v2`);
        // console.log("reduxResp",resp);
  
        return resp.data;
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data !== undefined) {
          if (error.response.data === "Unauthorized access (invalid token) !!") {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");
            window.location.reload(false);
          }
        }
        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
  );


  export const getSuperAdminDisabledType1 = createAsyncThunk(
    'superAdmin/getSuperAdminDisabledType1',
    async (thunkAPI) => {
      try {
        const resp = await axios(`/super-admin/admins/disabled?userType=v1`);
      //   console.log("reduxResp",resp);
  
        return resp.data;
      } catch (error) {
          console.log(error.response.data);
          if (error.response.data !== undefined) {
            if (error.response.data === "Unauthorized access (invalid token) !!") {
              sessionStorage.removeItem("Authorization");
              sessionStorage.removeItem("Address");
              Cookies.remove("Version");
              window.location.reload(false);
            }
          }
        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
  );
  
  export const getSuperAdminDisabledType2 = createAsyncThunk(
      'superAdmin/getSuperAdminDisabledType2',
      async (thunkAPI) => {
        try {
          const resp = await axios(`/super-admin/admins/disabled?userType=v2`);
        //   console.log("reduxResp",resp);
    
          return resp.data;
        } catch (error) {
          console.log(error.response.data);
          if (error.response.data !== undefined) {
            if (error.response.data === "Unauthorized access (invalid token) !!") {
              sessionStorage.removeItem("Authorization");
              sessionStorage.removeItem("Address");
              window.location.reload(false);
            }
          }
          return thunkAPI.rejectWithValue('something went wrong');
        }
      }
    );



const getManageAccountsDataSlice = createSlice({
  name: 'manageAccounts',
  initialState,
  reducers: {},
  extraReducers:{
      [getSuperAdminEnabledType1.fulfilled]: (state, action) => {
        state.enabledType1Data = action.payload.admins;
        state.enabledType1Loading = 1
      },
      [getSuperAdminEnabledType1.rejected]: (state, action) => {
        console.log(action);
        state.enabledType1Loading = 2
      },
      [getSuperAdminEnabledType2.fulfilled]: (state, action) => {
        state.enabledType2Data = action.payload.admins;
        state.enabledType2Loading = 1
      },
      [getSuperAdminEnabledType2.rejected]: (state, action) => {
        console.log(action);
        state.enabledType2Loading = 2
      },

      [getSuperAdminDisabledType1.fulfilled]: (state, action) => {
        state.disabledType1Data = action.payload.admins;
        state.disabledType1Loading = 1
      },
      [getSuperAdminDisabledType1.rejected]: (state, action) => {
        console.log(action);
        state.disabledType1Loading = 2
      },
      [getSuperAdminDisabledType2.fulfilled]: (state, action) => {
        state.disabledType2Data = action.payload.admins;
        state.disabledType2Loading = 1
      },
      [getSuperAdminDisabledType2.rejected]: (state, action) => {
        console.log(action);
        state.disabledType2Loading = 2
      },
  },
});



export default getManageAccountsDataSlice.reducer;


