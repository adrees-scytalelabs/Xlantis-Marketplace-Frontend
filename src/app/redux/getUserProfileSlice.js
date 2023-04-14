import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie";

const initialState = {
  userData:"",
};

export const getUserProfile = createAsyncThunk(
  'user/getUserprofile',
  async ( thunkAPI) => {
    let userLogin = sessionStorage.getItem("Authorization");
    if (userLogin != "undefined") {
      let version = Cookies.get("Version");
    try {

      const resp = await axios(`${version}/user/profile`);

      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
}
);

const getUserProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers:{
      [getUserProfile.fulfilled]: (state, action) => {
        state.userData = action.payload.userData.username;
      },
      [getUserProfile.rejected]: (state, action) => {
        console.log(action);
      }
  },
});



export default getUserProfileSlice.reducer;


