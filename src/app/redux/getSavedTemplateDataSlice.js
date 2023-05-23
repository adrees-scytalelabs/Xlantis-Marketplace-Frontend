import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  templatesData: [],
  loading: 0,
};

export const getSavedTemplatesData = createAsyncThunk(
  "savedTemplate/getsavedTemplate",
  async (thunkAPI) => {
    try {
      const resp = await axios("/super-admin/template");
      return resp.data;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
        console.log(error.response);
      }
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const getSavedTemplatesDataSlice = createSlice({
  name: "cousavedTemplatent",
  initialState,
  reducers: {},
  extraReducers: {
    [getSavedTemplatesData.fulfilled]: (state, action) => {
      state.templatesData = action.payload.templates;
      state.loading = 1;
    },
    [getSavedTemplatesData.rejected]: (state, action) => {
      console.log(action);
      state.loading = 2;
    },
  },
});

export default getSavedTemplatesDataSlice.reducer;
