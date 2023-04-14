import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  collectionData:[],
  loading:0
};

export const getNewNftCollection = createAsyncThunk(
  'newNftCollection/getNewNftCollection',
  async (name,thunkAPI) => {
    try {

        // console.log("nameThunk",name);
      const resp = await axios(`/collection/collections/${name}`);
    //   console.log("reduxResp",resp);

      return resp.data;
    } catch (error) {
        console.log("get collections error");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response !== undefined) {
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

const getNewNftCollectionSlice = createSlice({
  name: 'newNftcollection',
  initialState,
  reducers: {},
  extraReducers:{
      [getNewNftCollection.fulfilled]: (state, action) => {
        state.collectionData = action.payload.collectionData;
        state.loading = 1
      },
      [getNewNftCollection.rejected]: (state, action) => {
        console.log(action);
      }
  },
});



export default getNewNftCollectionSlice.reducer;


