import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  collectionData:[],
  collectionCont:0,
};

export const getMyCollection = createAsyncThunk(
  'myCollection/getMyCollection',
  async (name,thunkAPI) => {
    try {

      const resp = await axios(`/collection/myCollections/${name.start}/${name.end}`);
      console.log("reduxResp",resp);

      return resp.data;
    } catch (error) {
        console.log(error.response.data);
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

const getMyCollectionSlice = createSlice({
  name: 'myCollection',
  initialState,
  reducers: {},
  extraReducers:{
      [getMyCollection.fulfilled]: (state, action) => {
        state.collectionData = action.payload.collectionData;
        state.collectionCont = action.payload.collectionCount;
      },
      [getMyCollection.rejected]: (state, action) => {
        console.log(action);
      }
  },
});



export default getMyCollectionSlice.reducer;


