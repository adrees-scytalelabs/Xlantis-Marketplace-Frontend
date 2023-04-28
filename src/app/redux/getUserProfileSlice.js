import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  userData:[],
  loading:0
};

export const getUserProfile = createAsyncThunk(
  'user/getUserprofile',
  async ( thunkAPI) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
      let version = Cookies.get("Version");
    try {
      const resp = await axios(`${version}/user/profile`);
      console.log("reduxResp",resp);

      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const getUserProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers:{
      [getUserProfile.fulfilled]: (state, action) => {
        state.userData = action.payload.userData;
        state.loading = 1
      },
      [getUserProfile.rejected]: (state, action) => {
        console.log(action);
        state.loading = 2
      }
  },
});



export default getUserProfileSlice.reducer;


