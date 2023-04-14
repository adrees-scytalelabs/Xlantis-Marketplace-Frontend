import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  notification:[],
  notificationLoading:0
};

export const getHeaderNotification = createAsyncThunk(
  'header/getHeaderNotification',
  async ( name,thunkAPI) => {
    try {
      const resp = await axios(`/notifications/${name.start}/${name.end}`);
    //   console.log("reduxResp",resp);

      return resp.data;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
            return thunkAPI.rejectWithValue('something went wrong');
          }
    }
  }
);

const getHeaderNotificationSlice = createSlice({
  name: 'headerNotification',
  initialState,
  reducers: {},
  extraReducers:{
      [getHeaderNotification.fulfilled]: (state, action) => {
        state.notification = action.payload.notifications;
        state.notificationLoading = 1
      },
      [getHeaderNotification.rejected]: (state, action) => {
        console.log(action);
        state.notificationLoading = 2
      }
  },
});



export default getHeaderNotificationSlice.reducer;


