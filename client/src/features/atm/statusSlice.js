import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStatus, updateStatus } from "./atmApi";
import {toast} from "react-hot-toast"

const initialState = {
  status: "idle",
  error:null,
  cashstatus: null,
  loading:false
};

export const updateStatusAsync = createAsyncThunk(
  "cashstatus/update",
  async (update, { rejectWithValue }) => {
    try {
      const updatedstatus = await updateStatus(update);
      return updatedstatus.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getStatusAsync = createAsyncThunk(
  "cashstatus/getStatus",
  async (atmId, { rejectWithValue }) => {
    try {
      const response = await getStatus(atmId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const statusSlice = createSlice({
  name: "cashStatus",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStatusAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateStatusAsync.fulfilled, (state, action) => {
        state.status = "idle";
        toast.success("Update Successfull");
        state.loading = false;
      })
      .addCase(updateStatusAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStatusAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cashstatus = action.payload;
      })
      .addCase(getStatusAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      
  },
});

export const selectLoading = (state)=> state.cashStatus.loading;
export const selectcashStatus = (state)=> state.cashStatus.cashstatus;
export default statusSlice.reducer;
