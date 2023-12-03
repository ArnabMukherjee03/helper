import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import resetReducer from "../features/auth/resetSlice";
import userReducer from "../features/user/userSlice";
import atmReducer from "../features/atm/atmSlice";
import reviewReducer from "../features/rating/reviewSlice";
export const store = configureStore({
    reducer:{
        auth: authReducer,
        resetPassword: resetReducer,
        user: userReducer,
        atm: atmReducer,
        review: reviewReducer
    }
})