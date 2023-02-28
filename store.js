import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";//Can divide the data layer into parts

export const store = configureStore({
    reducer: {
        nav: navReducer,
    },
});










