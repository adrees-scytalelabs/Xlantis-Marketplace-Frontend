import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  nftCount:0,
};

export const getUserCount = createAsyncThunk(
  'count/getUserCount',
  async ( thunkAPI) => {
    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
    try {

      const resp = await axios(`/v1-sso/user/getCounts`);

      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const getUserCountSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {},
  extraReducers:{
      [getUserCount.fulfilled]: (state, action) => {
        state.nftCount = action.payload.NFTscount;
      },
      [getUserCount.rejected]: (state, action) => {
        console.log(action);
      }
  },
});



export default getUserCountSlice.reducer;


