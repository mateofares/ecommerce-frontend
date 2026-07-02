import { configureStore } from "@reduxjs/toolkit";
import productoReducer from './productoSlice'
import authReducer from './authSlice'
import carritoReducer from './carritoSlice'
import direccionReducer from './direccionSlice'
import ordenReducer from './ordenSlice'
import pagoReducer from './pagoSlice'
import reseniaReducer from './reseniaSlice'

export const store = configureStore({
    reducer: {
        productos: productoReducer,
        auth: authReducer,
        carrito: carritoReducer,
        direccion: direccionReducer,
        ordenes: ordenReducer,
        pagos: pagoReducer,
        resenias: reseniaReducer
    }
})