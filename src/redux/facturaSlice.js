import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const URL = "http://localhost:8080/facturas"
export const fetchFacturas = createAsyncThunk('facturas/fetchFacturas', async(_, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const fetchFacturaPorOrden = createAsyncThunk('facturas/fetchFacturaPorOrden', async(ordenId, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.get(URL+'/orden/'+ordenId, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const anularFactura = createAsyncThunk('facturas/anularFactura', async(id, { getState })=>{
    const token = getState().auth.token
    await axios.patch(URL+'/'+id+'/anular', {}, { headers: { Authorization: `Bearer ${token}` } })
    return id
})

const facturaSlice = createSlice({
    name : 'facturas',
    initialState: {
        items: [],
        seleccionada: null,
        fetched: false,
        loading: false,
        error: null
    },
    reducers: {
        //funciones para actualizar el estado de forma SINCRONA
    },
    extraReducers: (builder) => { //peticiones ASINCRONAS
        builder
        .addCase(fetchFacturas.pending, (state)=>{ //caso de que hacer mientras esta en pending
            state.loading = true,
            state.error = null
        })
        .addCase(fetchFacturas.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload
            state.fetched = true
        })
        .addCase(fetchFacturas.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA BUSCAR FACTURA POR ORDEN
        .addCase(fetchFacturaPorOrden.pending, (state)=>{
            state.loading = true,
            state.error = null,
            state.seleccionada = null
        })
        .addCase(fetchFacturaPorOrden.fulfilled, (state,action) => {
            state.loading = false,
            state.seleccionada = action.payload
        })
        .addCase(fetchFacturaPorOrden.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //CASE PARA ANULAR FACTURA
        .addCase(anularFactura.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(anularFactura.fulfilled, (state,action) => {
            state.loading = false
            const index = state.items.findIndex((factura) => factura.id === action.payload)
            if (index !== -1) state.items[index] = { ...state.items[index], activa: false }
            if (state.seleccionada?.id === action.payload) state.seleccionada = { ...state.seleccionada, activa: false }
        })
        .addCase(anularFactura.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default facturaSlice.reducer
