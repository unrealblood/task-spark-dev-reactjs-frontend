import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./slices/taskSlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        tasks: taskSlice.reducer,
        auth: authSlice.reducer
    }
});