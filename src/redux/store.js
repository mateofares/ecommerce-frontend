import { configureStore } from "@reduxjs/toolkit";
import productoReducer from './productoSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        productos: productoReducer,
        auth: authReducer,
    }
})