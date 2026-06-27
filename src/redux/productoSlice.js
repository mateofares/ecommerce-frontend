import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const URL = "http://localhost:8080/productos"
export const fetchProductos = createAsyncThunk('productos/fetchProductos', async()=>{
    const {data} = await axios.get(URL)
    return data
})

export const postProductos = createAsyncThunk('productos/postProductos', async(newProducto)=>{
    const {data} = await axios.post(URL, newProducto)
    return data
})

const productoSlice = createSlice({
    name : 'productos',
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
        .addCase(fetchProductos.pending, (state)=>{ //caso de que hacer mientras esta en pending
            state.loading = true,
            state.error = null
        })
        .addCase(fetchProductos.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload
        })
        .addCase(fetchProductos.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA POST DE PRODUCTOS
            .addCase(postProductos.pending, (state)=>{ 
            state.loading = true,
            state.error = null
        })
        .addCase(postProductos.fulfilled, (state,action) => {
            state.loading = false,
            state.items = [...state.items,action.payload]
        })
        .addCase(postProductos.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default productoSlice.reducer