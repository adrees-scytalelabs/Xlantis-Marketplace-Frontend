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
      // console.log("nameThunk",name);
      const resp = await axios(`/drop/myDrops/${name.status}/${name.start}/${name.end}`);
      console.log("reduxResp", resp);
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
    reset: (state) => {
      state.myDropsData = [0];
      state.loading = 0;
    },
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

export const { reset } = getMyDropsSlice.actions;

export default getMyDropsSlice.reducer;


