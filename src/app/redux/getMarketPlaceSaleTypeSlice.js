import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  saleTypeData:[],
  loading:0
};

export const getSaleType = createAsyncThunk(
  'marketPlaceSaletype/getMarketPlaceSaletype',
  async (name,thunkAPI) => {
    try {

        // console.log("nameThunk",name);
      const resp = await axios(`/drop/saleType/${name.saleType}/${name.start}/${name.end}`);
       console.log("reduxResp",resp);
      name.setTokenList(resp.data.data);
      name.setTotalDrops(resp.data.data.length);

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

const getMarketPlaceSaleTypeSlice = createSlice({
  name: 'marketPlaceSaletype',
  initialState,
  reducers: {},
  extraReducers:{
      [getSaleType.fulfilled]: (state, action) => {
        state.saleTypeData = action.payload.data;
        state.loading = 1
      },
      [getSaleType.rejected]: (state, action) => {
        console.log(action);
        state.loading = 2
      }
  },
});



export default getMarketPlaceSaleTypeSlice.reducer;


