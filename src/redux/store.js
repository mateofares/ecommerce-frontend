import { configureStore } from "@reduxjs/toolkit";
import productoReducer from './productoSlice'

export const store = configureStore({
    reducer: {productos: productoReducer}
})