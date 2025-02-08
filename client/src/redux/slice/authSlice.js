import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const initialState = {
    user: {
        name: '',
        email: '',
        image:''
    },
    isAuthenticated: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setAuthState(state) {
            state.isAuthenticated = true
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, clearUser, setAuthState } = userSlice.actions;

export default userSlice.reducer;
