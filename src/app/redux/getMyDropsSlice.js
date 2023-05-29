import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  myDropsData: [0],
  loading: 0
};

export const getMyDrop = createAsyncThunk(
  'myDrops/getMyDrops',
  async (name, thunkAPI) => {
    try {
      const resp = await axios(`/drop/myDrops/${name.status}/${name.start}/${name.end}?marketplaceId=${name.marketplaceId}`);
      console.log("reduxResp", resp);
      name.setTokenList(resp.data.data)
      name.setTotalDrops(resp.data.data.length)
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

const getMyDropsSlice = createSlice({
  name: 'myDrops',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getMyDrop.fulfilled]: (state, action) => {
      state.myDropsData = action.payload.data;
      state.loading = 1
    },
    [getMyDrop.rejected]: (state, action) => {
      console.log(action);
      state.loading = 2
    }
  },
});

export default getMyDropsSlice.reducer;


