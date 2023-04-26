import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  accountType1Data:[],
  accountType1Loading:0,
  accountType2Data:[],
  accountType2Loading:0

};

export const getSuperAdminAccountType1 = createAsyncThunk(
  'superAdmin/getSuperAdminAccountType1',
  async (name,thunkAPI) => {
    try {
      const resp = await axios(`/super-admin/admins/${name.start}/${name.end}?userType=v1`);

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

export const getSuperAdminAccountType2 = createAsyncThunk(
    'superAdmin/getSuperAdminAccountType2',
    async (name,thunkAPI) => {
      try {
        const resp = await axios(`/super-admin/admins/${name.start}/${name.end}?userType=v2`);
        // console.log("reduxResp",resp);
  
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



const getSuperAdminAccountsDataSlice = createSlice({
  name: 'accountAccounts',
  initialState,
  reducers: {},
  extraReducers:{
      [getSuperAdminAccountType1.fulfilled]: (state, action) => {
        state.accountType1Data = action.payload.Admins;
        state.accountType1Loading = 1
      },
      [getSuperAdminAccountType1.rejected]: (state, action) => {
        console.log(action);
        state.accountType1Loading = 2
      },
      [getSuperAdminAccountType2.fulfilled]: (state, action) => {
        state.accountType2Data = action.payload.Admins;
        state.accountType2Loading = 1
      },
      [getSuperAdminAccountType2.rejected]: (state, action) => {
        console.log(action);
        state.accountType2Loading = 2
      },
  },
});



export default getSuperAdminAccountsDataSlice.reducer;


