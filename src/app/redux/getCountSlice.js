import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  count:[],
  nftCount:0,
  collectionCount:0,
  isLoading:0
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
        state.isLoading = 1;
      },
      [getCount.rejected]: (state, action) => {
        console.log(action);
        state.isLoading = 2;
      }
  },
});



export default getCountSlice.reducer;


