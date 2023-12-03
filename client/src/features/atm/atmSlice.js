import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchAtmById, fetchAtms, getStatus, updateStatus } from "./atmApi";


const initialState = {
  status:"idle",
  loading:"idle",
  atms: null,
  currentAtm:[],
  cashstatus:[],
  atmError:'',
  statusError:'',
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

export const updateStatusAsync = createAsyncThunk(
  "atm/cashstatus/update",
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
  "atm/cashstatus/getStatus",
  async (atmId, { rejectWithValue }) => {
    try {
      const response = await getStatus(atmId);
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
        state.atmError = action.payload;
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
        state.atmError = action.payload;
      })
      .addCase(updateStatusAsync.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateStatusAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        toast.success("Update Successfull");
        state.currentAtm= action.payload.atm;
        state.cashstatus.push(action.payload.status);
      })
      .addCase(updateStatusAsync.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      })
      .addCase(getStatusAsync.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getStatusAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.cashstatus = action.payload;
      })
      .addCase(getStatusAsync.rejected, (state, action) => {
        state.loading = "rejected";
        state.statusError = action.payload;
      })
      
  },
});

export const selectAtms = (state)=> state.atm.atms;
export const selectCurrentAtm = (state)=> state.atm.currentAtm;
export const selectStatus = (state)=> state.atm.status;
export const selectCashStatus = (state)=> state.atm.cashstatus;
export const selectLoading = (state)=> state.atm.loading;
export default atmSlice.reducer;
