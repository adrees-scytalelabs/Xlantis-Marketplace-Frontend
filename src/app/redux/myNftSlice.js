import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  nftData:[],
  nftCount:0,
  loading:0
};

export const myNft = createAsyncThunk(
  'myNft/getMyNft',
  async (name,thunkAPI) => {
    try {

      const resp = await axios(`/nft/myNFTs/${name.start}/${name.end}`);
      return resp.data;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
        console.log(error.response);
      }
      if (error.response.data !== undefined) {
        if (
          error.response.data === "Unauthorized access (invalid token) !!"
        ) {
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

const myNftSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {},
  extraReducers:{
      [myNft.fulfilled]: (state, action) => {
        state.nftData = action.payload.NFTdata;
        state.nftCount = action.payload.Nftcount
        state.loading = 1
      },
      [myNft.rejected]: (state, action) => {
        console.log(action);
        state.loading = 2
      }
  },
});



export default myNftSlice.reducer;


