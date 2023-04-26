import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  verifiedType1Data:[],
  verifiedType1Loading:0,
  verifiedType2Data:[],
  verifiedType2Loading:0

};

export const getSuperAdminVerifiedType1 = createAsyncThunk(
  'superAdmin/getSuperAdminVerifiedType1',
  async (name,thunkAPI) => {
    try {
      const resp = await axios(`/super-admin/admins/verified/${name.start}/${name.end}?userType=v1`);
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

export const getSuperAdminVerifiedType2 = createAsyncThunk(
    'superAdmin/getSuperAdminVerifiedType2',
    async (name,thunkAPI) => {
      try {
        const resp = await axios(`/super-admin/admins/verified/${name.start}/${name.end}?userType=v2`);
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



const getVerifiedAccountsDataSlice = createSlice({
  name: 'verifiedAccounts',
  initialState,
  reducers: {},
  extraReducers:{
      [getSuperAdminVerifiedType1.fulfilled]: (state, action) => {
        state.verifiedType1Data = action.payload.verifiedAdmins;
        state.verifiedType1Loading = 1
      },
      [getSuperAdminVerifiedType1.rejected]: (state, action) => {
        console.log(action);
        state.verifiedType1Loading = 2
      },
      [getSuperAdminVerifiedType2.fulfilled]: (state, action) => {
        state.verifiedType2Data = action.payload.verifiedAdmins;
        state.verifiedType2Loading = 1
      },
      [getSuperAdminVerifiedType2.rejected]: (state, action) => {
        console.log(action);
        state.verifiedType2Loading = 2
      },
  },
});



export default getVerifiedAccountsDataSlice.reducer;


