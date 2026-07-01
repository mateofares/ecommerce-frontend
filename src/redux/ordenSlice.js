import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { comprarCarrito } from "./carritoSlice";

const URL = "http://localhost:8080/ordenes"
export const fetchMisCompras = createAsyncThunk('ordenes/fetchMisCompras', async(_, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.get(URL+'/mis-compras', {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
})

const ordenSlice = createSlice({
    name : 'ordenes',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        //funciones para actualizar el estado de forma SINCRONA
    },
    extraReducers: (builder) => { //peticiones ASINCRONAS
        builder
        .addCase(fetchMisCompras.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchMisCompras.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload
        })
        .addCase(fetchMisCompras.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //cuando se compra un carrito, se guarda la orden en el estado de ordenes
        .addCase(comprarCarrito.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload]
        })
    }
})

export default ordenSlice.reducer
