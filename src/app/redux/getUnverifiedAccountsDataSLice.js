import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  unverifiedType1Data:[],
  unverifiedType1Loading:0,
  unverifiedType2Data:[],
  unverifiedType2Loading:0

};

export const getSuperAdminUnverifiedType1 = createAsyncThunk(
  'superAdmin/getSuperAdminUnverifiedType1',
  async (name,thunkAPI) => {
    try {
      const resp = await axios(`/super-admin/admins/unverified/${name.start}/${name.end}?userType=v1`);
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

export const getSuperAdminUnverifiedType2 = createAsyncThunk(
    'superAdmin/getSuperAdminUnverifiedType2',
    async (name,thunkAPI) => {
      try {
        const resp = await axios(`/super-admin/admins/unverified/${name.start}/${name.end}?userType=v2`);
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



const getunverifiedAccountsDataSlice = createSlice({
  name: 'unverifiedAccounts',
  initialState,
  reducers: {},
  extraReducers:{
      [getSuperAdminUnverifiedType1.fulfilled]: (state, action) => {
        state.unverifiedType1Data = action.payload.unverifiedAdmins;
        state.unverifiedType1Loading = 1
      },
      [getSuperAdminUnverifiedType1.rejected]: (state, action) => {
        console.log(action);
        state.unverifiedType1Loading = 2
      },
      [getSuperAdminUnverifiedType2.fulfilled]: (state, action) => {
        state.unverifiedType2Data = action.payload.unverifiedAdmins;
        state.unverifiedType2Loading = 1
      },
      [getSuperAdminUnverifiedType2.rejected]: (state, action) => {
        console.log(action);
        state.unverifiedType2Loading = 2
      },
  },
});



export default getunverifiedAccountsDataSlice.reducer;


