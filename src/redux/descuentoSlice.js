import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const URL = "http://localhost:8080/descuentos"
export const fetchDescuentos = createAsyncThunk('descuentos/fetchDescuentos', async()=>{
    const {data} = await axios.get(URL)
    return data
})

export const crearDescuento = createAsyncThunk('descuentos/crearDescuento', async(nuevoDescuento, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.post(URL, nuevoDescuento, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const eliminarLogicoDescuento = createAsyncThunk('descuentos/eliminarLogicoDescuento', async(id, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.patch(URL+'/'+id+'/eliminar-logico', {}, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const deleteDescuento = createAsyncThunk('descuentos/deleteDescuento', async(id, { getState })=>{
    const token = getState().auth.token
    await axios.delete(URL+'/'+id, { headers: { Authorization: `Bearer ${token}` } })
    return id
})

const descuentoSlice = createSlice({
    name : 'descuentos',
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
        .addCase(fetchDescuentos.pending, (state)=>{ //caso de que hacer mientras esta en pending
            state.loading = true,
            state.error = null
        })
        .addCase(fetchDescuentos.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload
        })
        .addCase(fetchDescuentos.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA CREAR DESCUENTO
        .addCase(crearDescuento.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(crearDescuento.fulfilled, (state,action) => {
            state.loading = false,
            state.items = [...state.items,action.payload]
        })
        .addCase(crearDescuento.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA ELIMINAR LOGICO DE DESCUENTO
        .addCase(eliminarLogicoDescuento.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(eliminarLogicoDescuento.fulfilled, (state,action) => {
            const index = state.items.findIndex((descuento) => descuento.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
            state.loading = false
        })
        .addCase(eliminarLogicoDescuento.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA DELETE DE DESCUENTO
        .addCase(deleteDescuento.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(deleteDescuento.fulfilled, (state,action) => {
            state.loading = false,
            state.items = state.items.filter((descuento) => descuento.id !== action.payload)
        })
        .addCase(deleteDescuento.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default descuentoSlice.reducer
