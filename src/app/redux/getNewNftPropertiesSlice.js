import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  templates:[0],
  propertiesLoading:0
};

export const getNewNftProperties = createAsyncThunk(
  'newNftProperties/getNewNftProperties',
  async (name,thunkAPI) => {
    try {

        console.log("nameThunk",name);
      const resp = await axios(`/nft-properties/${name}`);
    //   console.log("reduxResp",resp);

      return resp.data;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const getNewNftPropertiesSlice = createSlice({
  name: 'newNftProperties',
  initialState,
  reducers: {},
  extraReducers:{
      [getNewNftProperties.fulfilled]: (state, action) => {
        state.templates = action.payload.templates;
        state.propertiesLoading = 1
      },
      [getNewNftProperties.rejected]: (state, action) => {
        console.log(action);
      }
  },
});



export default getNewNftPropertiesSlice.reducer;


