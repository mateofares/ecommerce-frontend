import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const URL = "http://localhost:8080/pagos"
export const pagarOrden = createAsyncThunk('pagos/pagarOrden', async({ ordenId, metodo }, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.post(URL+'/orden/'+ordenId+'/pagar', { metodo }, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
})

const pagoSlice = createSlice({
    name : 'pagos',
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        //funciones para actualizar el estado de forma SINCRONA
    },
    extraReducers: (builder) => { //peticiones ASINCRONAS
        builder
        .addCase(pagarOrden.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(pagarOrden.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(pagarOrden.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default pagoSlice.reducer
