import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { deleteReview, getReview, newReview } from "./ratingApi";


const initialState = {
  status: "idle",
  reviews: [],
  error: null
};

export const newReviewAsync = createAsyncThunk(
  "review/new",
  async (newData, { rejectWithValue }) => {
    try {
      const response = await newReview(newData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getReviewAsync = createAsyncThunk(
  "review/get",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getReview(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReviewAsync = createAsyncThunk(
  "review/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteReview(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(newReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newReviewAsync.fulfilled, (state, action) => {
        state.status = "idle";
        toast.success("Thanks For Rating");
      })
      .addCase(newReviewAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReviewAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.reviews = action.payload;
      })
      .addCase(getReviewAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.status = "idle";
        toast.success("Comment Sucessfully Deleted");
      })
      .addCase(deleteReviewAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
  },
});

export const selectReviews = (state)=> state.review.reviews;
export default reviewSlice.reducer;
