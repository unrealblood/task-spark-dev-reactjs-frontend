import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        setIsAuthenticated: (state = initialState, action) => {
            state.isAuthenticated = action.payload;
        }
    }
});

export const { setIsAuthenticated } = authSlice.actions;