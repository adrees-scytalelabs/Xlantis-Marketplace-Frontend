import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  fixedPriceData: [],
  fixedPriceLoading: 0,
  auctionData: [],
  auctionLoading: 0,
};

export const getMarketFixedPrice = createAsyncThunk(
  "market/fixedPrice",
  async (name, thunkAPI) => {
    try {
      let version = Cookies.get("Version");
      let endpoint;
      if (version === undefined) {
        endpoint = `/drop/saleType/fixed-price/${name.start}/${name.end}?marketplaceId=${name.marketplaceId}`;
      } else {
        endpoint = `/drop/saleType/fixed-price/${name.start}/${name.end}?marketplaceId=${name.marketplaceId}`;
      }

      const resp = await axios(endpoint);
      return resp.data;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
        console.log(error.response);
      }
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getMarketAuction = createAsyncThunk(
  "market/auction",
  async (name, thunkAPI) => {
    try {
      let version = Cookies.get("Version");
      let endpoint;

      if (version === undefined) {
        endpoint = `/drop/saleType/auction/${name.start}/${name.end}`;
      } else {
        endpoint = `/drop/saleType/auction/${name.start}/${name.end}`;
      }

      const resp = await axios(endpoint);
      return resp.data;
    } catch (error) {
      console.log("could not get bidable drops ", error.response);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const getMarketPlaceDataSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: {
    [getMarketFixedPrice.fulfilled]: (state, action) => {
      state.fixedPriceData = action.payload.data;
      state.fixedPriceLoading = 1;
    },
    [getMarketFixedPrice.rejected]: (state, action) => {
      console.log(action);
      state.fixedPriceLoading = 2;
    },
    [getMarketAuction.fulfilled]: (state, action) => {
      state.auctionData = action.payload.data;
      state.auctionLoading = 1;
    },
    [getMarketAuction.rejected]: (state, action) => {
      console.log(action);
      state.auctionLoading = 2;
    },
  },
});

export default getMarketPlaceDataSlice.reducer;
