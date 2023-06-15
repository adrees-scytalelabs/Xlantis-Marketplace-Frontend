import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { unwrapResult } from '@reduxjs/toolkit';
const initialState = {
  notification: [],
  notificationLoading: 0,
};

export const getHeaderNotification = createAsyncThunk(
  "header/getHeaderNotification",
  async (name, thunkAPI) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
    console.log("auth checker",sessionStorage.getItem("Authorization"))
    try {
      const resp = await axios(`/notifications/${name.start}/${name.end}`);
      console.log("reduxResp notificiation", resp);
      sessionStorage.setItem("notification",JSON.stringify(resp.data.notifications));
      // console.log("i am here",resp.data.notifications)
      name.setNotificationsList(resp.data.notifications)
      return resp.data;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
        console.log(error.response);
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  }
);

const getHeaderNotificationSlice = createSlice({
  name: "headerNotification",
  initialState,
  reducers: {},
  extraReducers: {
    [getHeaderNotification.fulfilled]: (state, action) => {
      state.notification = action.payload.notifications;
      state.notificationLoading = 1;
    },
    [getHeaderNotification.rejected]: (state, action) => {
      console.log(action);
      state.notificationLoading = 2;
    },
  },
});

export default getHeaderNotificationSlice.reducer;
