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

export const fetchMisProductos = createAsyncThunk('productos/fetchMisProductos', async(usuarioId, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.get(URL+'?usuarioId='+usuarioId, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const updateProducto = createAsyncThunk('productos/updateProducto', async(productoActualizado, { getState })=>{
    const token = getState().auth.token
    const { id } = productoActualizado
    const {data} = await axios.patch(URL+'/'+id, productoActualizado, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const deleteProducto = createAsyncThunk('productos/deleteProducto', async(id, { getState })=>{
    const token = getState().auth.token
    await axios.delete(URL+'?id='+id, { headers: { Authorization: `Bearer ${token}` } })
    return id
})

export const eliminarLogicoProducto = createAsyncThunk('productos/eliminarLogicoProducto', async(id, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.patch(URL+'/'+id+'/eliminar-logico', {}, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const aplicarDescuentoProducto = createAsyncThunk('productos/aplicarDescuentoProducto', async({ id, porcentaje }, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.patch(URL+'/'+id+'/descuento', { porcentaje }, { headers: { Authorization: `Bearer ${token}` } })
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
        //CASE PARA FETCH DE MIS PRODUCTOS
        .addCase(fetchMisProductos.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchMisProductos.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload
        })
        .addCase(fetchMisProductos.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA UPDATE DE PRODUCTOS
        .addCase(updateProducto.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(updateProducto.fulfilled, (state,action) => {
            const index = state.items.findIndex((producto) => producto.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
            state.loading = false
        })
        .addCase(updateProducto.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA DELETE DE PRODUCTOS
        .addCase(deleteProducto.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(deleteProducto.fulfilled, (state,action) => {
            state.loading = false,
            state.items = state.items.filter((producto) => producto.id !== action.payload)
        })
        .addCase(deleteProducto.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA ELIMINAR LOGICO DE PRODUCTOS
        .addCase(eliminarLogicoProducto.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(eliminarLogicoProducto.fulfilled, (state,action) => {
            const index = state.items.findIndex((producto) => producto.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
            state.loading = false
        })
        .addCase(eliminarLogicoProducto.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA APLICAR DESCUENTO A UN PRODUCTO
        .addCase(aplicarDescuentoProducto.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(aplicarDescuentoProducto.fulfilled, (state,action) => {
            const index = state.items.findIndex((producto) => producto.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
            state.loading = false
        })
        .addCase(aplicarDescuentoProducto.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default productoSlice.reducer