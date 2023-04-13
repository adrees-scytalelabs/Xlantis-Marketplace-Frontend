import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    defaultTemplate:{
        name: "",
    properties: [],
    },
    loadingDefault:0
};

export const getNewNftDefaultTemplate = createAsyncThunk(
  'newNftDefaulTemplate/getnewNftDefaulTemplate',
  async (thunkAPI) => {
    try {
      const resp = await axios(`/nft-properties/admin/default`);
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

const getNewNftDefaultTemplateSlice = createSlice({
  name: 'newNftDefaulTemplate',
  initialState,
  reducers: {},
  extraReducers:{
      [getNewNftDefaultTemplate.fulfilled]: (state, action) => {
        state.defaultTemplate = action.payload.defaultTemplate;
        state.loadingDefault = 1
      },
      [getNewNftDefaultTemplate.rejected]: (state, action) => {
        console.log(action);
      }
  },
});



export default getNewNftDefaultTemplateSlice.reducer;


