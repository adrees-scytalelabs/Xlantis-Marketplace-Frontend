import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  countsType1:[],
  countsType2:[],
  loadingType1:0,
  loadingType2:0
};

axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${sessionStorage.getItem("Authorization")}`;

export const getSuperAdminCountsType1 = createAsyncThunk(
  'superAdmin/getSuperAdminCountsType1',
  async ( thunkAPI) => {
    try {
      const resp = await axios(`/super-admin/admins/counts?userType=v1`);
      // console.log("reduxRespType1",resp);

      return resp.data;
    } catch (error) {
      console.log(error);
      console.log(error.response);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getSuperAdminCountsType2 = createAsyncThunk(
    'superAdmin/getSuperAdminCountsType2',
    async ( thunkAPI) => {
      try {
        const resp = await axios(`/super-admin/admins/counts?userType=v2`);
        // console.log("reduxRespType2",resp);
  
        return resp.data;
      } catch (error) {
        console.log(error);
        console.log(error.response);
        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
  );

const getSuperAdminCountsSlice = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {},
  extraReducers:{
      [getSuperAdminCountsType1.fulfilled]: (state, action) => {
        state.countsType1 = action.payload.counts;
        state.loadingType1 = 1
      },
      [getSuperAdminCountsType1.rejected]: (state, action) => {
        console.log(action);
        state.loadingType1 = 2
      },
      [getSuperAdminCountsType2.fulfilled]: (state, action) => {
        state.countsType2 = action.payload.counts;
        state.loadingType2 = 1
      },
      [getSuperAdminCountsType2.rejected]: (state, action) => {
        console.log(action);
        state.loadingType2 = 2
      }
  },
});



export default getSuperAdminCountsSlice.reducer;


