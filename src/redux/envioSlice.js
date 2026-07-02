import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const URL = "http://localhost:8080/envios"
export const fetchEnvios = createAsyncThunk('envios/fetchEnvios', async(_, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const actualizarEstadoEnvio = createAsyncThunk('envios/actualizarEstado', async({ id, nuevoEstado }, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.patch(URL+'/'+id+'/estado?nuevoEstado='+nuevoEstado, {}, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const entregarEnvio = createAsyncThunk('envios/entregar', async(id, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.patch(URL+'/'+id+'/entregar', {}, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

const envioSlice = createSlice({
    name : 'envios',
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
        .addCase(fetchEnvios.pending, (state)=>{ //caso de que hacer mientras esta en pending
            state.loading = true,
            state.error = null
        })
        .addCase(fetchEnvios.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload
        })
        .addCase(fetchEnvios.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA ACTUALIZAR ESTADO DE ENVIO
        .addCase(actualizarEstadoEnvio.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(actualizarEstadoEnvio.fulfilled, (state,action) => {
            const index = state.items.findIndex((envio) => envio.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
            state.loading = false
        })
        .addCase(actualizarEstadoEnvio.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA MARCAR ENVIO COMO ENTREGADO
        .addCase(entregarEnvio.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(entregarEnvio.fulfilled, (state,action) => {
            const index = state.items.findIndex((envio) => envio.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
            state.loading = false
        })
        .addCase(entregarEnvio.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default envioSlice.reducer
