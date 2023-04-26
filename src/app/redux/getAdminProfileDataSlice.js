import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  adminUserData:[],
  adminLoading:0
};

export const getAdminProfileData = createAsyncThunk(
  'admin/getAdminProfileData',
  async ( thunkAPI) => {
    try {
      const resp = await axios(`/v1-sso/user/admin/profile`);
      console.log("reduxResp",resp);

      return resp.data;
    } catch (error) {
        console.log("Error from getting Admin profile", error);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const getAdminProfileDataSlice = createSlice({
  name: 'adminProfile',
  initialState,
  reducers: {},
  extraReducers:{
      [getAdminProfileData.fulfilled]: (state, action) => {
        state.adminUserData = action.payload.userData;
        state.adminLoading = 1
      },
      [getAdminProfileData.rejected]: (state, action) => {
        console.log(action);
        state.adminLoading = 2
      }
  },
});



export default getAdminProfileDataSlice.reducer;


