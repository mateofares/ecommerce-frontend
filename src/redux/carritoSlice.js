import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const URL = "http://localhost:8080/carrito"
export const getCarrito = createAsyncThunk('carrito/getCarrito', async(_, { getState })=>{
    const token = getState().auth.token
        console.log('token:', token)
    const {data} = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const postCarrito = createAsyncThunk('carrito/postCarrito', async(newCarrito, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.post(URL+'/agregar', newCarrito, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const eliminarItemCarrito = createAsyncThunk('carrito/eliminarItem', async(itemId, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.delete(URL+'/items/'+itemId, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const vaciarCarrito = createAsyncThunk('carrito/vaciar', async(_, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.delete(URL+'/vaciar', { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const comprarCarrito = createAsyncThunk('carrito/comprar', async(compraData, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.post(URL+'/comprar', compraData, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

const carritoSlice = createSlice({
    name : 'carrito',
    initialState: {
        items:[],
        total:0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => { //peticiones ASINCRONAS
        builder
        .addCase(getCarrito.pending, (state)=>{ //caso de que hacer mientras esta en pending
            state.loading = true,
            state.error = null
        })
        .addCase(getCarrito.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload.items
            state.total = action.payload.total
        })
        .addCase(getCarrito.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //agregar item
        .addCase(postCarrito.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(postCarrito.fulfilled, (state,action) => {
            state.loading = false,
            state.items = [...state.items,action.payload.items]
            state.total = action.payload.total
        })
        .addCase(postCarrito.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        // eliminar item
        .addCase(eliminarItemCarrito.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(eliminarItemCarrito.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload.items
            state.total = action.payload.total
        })
        .addCase(eliminarItemCarrito.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        // vaciar carrito
        .addCase(vaciarCarrito.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(vaciarCarrito.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload.items
            state.total = action.payload.total
        })
        .addCase(vaciarCarrito.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        // comprar carrito
        .addCase(comprarCarrito.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(comprarCarrito.fulfilled, (state) => {
            state.loading = false,
            state.items = []
            state.total = 0
        })
        .addCase(comprarCarrito.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default carritoSlice.reducer
