import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/authSlice"; 

const store = configureStore({
    reducer: {
        user: userReducer, 
    },
});

export default store;
