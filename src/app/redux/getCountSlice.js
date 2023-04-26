import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  nftCount:0,
  collectionCount:0,
};

export const getCount = createAsyncThunk(
  'count/getCount',
  async ( thunkAPI) => {
    let version = Cookies.get("Version");
    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
    try {

      const resp = await axios(`${version}/user/getcounts`);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const getCountSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {},
  extraReducers:{
      [getCount.fulfilled]: (state, action) => {
        state.nftCount = action.payload.NFTscount;
        state.collectionCount = action.payload.Collectionscount;
      },
      [getCount.rejected]: (state, action) => {
        console.log(action);
      }
  },
});



export default getCountSlice.reducer;


