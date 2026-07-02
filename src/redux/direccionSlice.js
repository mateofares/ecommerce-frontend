import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const URL = "http://localhost:8080/direcciones"
export const fetchDirecciones = createAsyncThunk('direcciones/fetchDirecciones', async(_, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.get(URL, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
})

export const agregarDireccion = createAsyncThunk('direcciones/agregarDireccion', async(nueva, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.post(URL, nueva, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
})

export const eliminarDireccion = createAsyncThunk('direcciones/eliminarDireccion', async(id, { getState })=>{
    const token = getState().auth.token
    await axios.delete(URL+'/'+id, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return id
})

export const predeterminarDireccion = createAsyncThunk('direcciones/predeterminarDireccion', async(id, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.post(URL+'/'+id+'/predeterminada', {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
})

const direccionSlice = createSlice({
    name : 'direcciones',
    initialState: {
        direcciones: [],
        loading: false,
        error: null
    },
    reducers: {
        //funciones para actualizar el estado de forma SINCRONA
    },
    extraReducers: (builder) => { //peticiones ASINCRONAS
        builder
        .addCase(fetchDirecciones.pending, (state)=>{ //caso de que hacer mientras esta en pending
            state.loading = true,
            state.error = null
        })
        .addCase(fetchDirecciones.fulfilled, (state,action) => {
            state.loading = false,
            state.direcciones = action.payload
        })
        .addCase(fetchDirecciones.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        // agregar
        .addCase(agregarDireccion.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(agregarDireccion.fulfilled, (state,action) => {
            state.loading = false,
            state.direcciones = [...state.direcciones, action.payload]
        })
        .addCase(agregarDireccion.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        // eliminar
        .addCase(eliminarDireccion.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(eliminarDireccion.fulfilled, (state,action) => {
            state.loading = false,
            state.direcciones = state.direcciones.filter(d => d.id !== action.payload)
        })
        .addCase(eliminarDireccion.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        // predeterminar
        .addCase(predeterminarDireccion.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(predeterminarDireccion.fulfilled, (state,action) => {
            state.loading = false,
            state.direcciones = state.direcciones.map(d =>
                ({ ...d, predeterminada: d.id === action.payload.id })
            )
        })
        .addCase(predeterminarDireccion.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default direccionSlice.reducer
