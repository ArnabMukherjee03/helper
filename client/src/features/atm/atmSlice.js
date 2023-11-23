import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
import { fetchAtmById, fetchAtms } from "./atmApi";


const initialState = {
  status: "idle",
  atms: null,
  currentAtm:'',
  error:''
};

export const fetchAtmsAsync = createAsyncThunk(
  "atm/fetchAtms",
  async (filter, { rejectWithValue }) => {
    try {
      const response = await fetchAtms(filter);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAtmByIdAsync= createAsyncThunk(
  "atm/fetchAtmById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchAtmById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const atmSlice = createSlice({
  name: "atm",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAtmsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAtmsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.atms = action.payload;
      })
      .addCase(fetchAtmsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchAtmByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAtmByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentAtm = action.payload;
      })
      .addCase(fetchAtmByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
  },
});

export const selectAtms = (state)=> state.atm.atms;
export const selectCurrentAtm = (state)=> state.atm.currentAtm;
export const selectStatus = (state)=> state.atm.status;
export default atmSlice.reducer;
