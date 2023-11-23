import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updatePassword, user } from "./userApi";
import toast from "react-hot-toast";


const initialState = {
  status: "idle",
  user: null,
  error: null,
  updateStatus: false,
};

export const userAsync = createAsyncThunk(
  "user/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await user();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePasswordAsync = createAsyncThunk(
  "user/updatePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updatePassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(userAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(updatePasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.updateStatus = true;
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.status = "rejected";
        if(typeof(action.payload)==="object"){
          action.payload.map(err =>{
            toast.error(err)
            return<></>
          })
        }else{
          toast.error(action.payload)
        }
    

      })
  },
});

export const selectCurrentUser = (state)=> state.user.user;
export const selectStatus = (state)=> state.user.status;
export const selectUpdate = (state)=> state.user.updateStatus;
export default userSlice.reducer;
