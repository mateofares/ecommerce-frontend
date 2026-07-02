import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const URL = "http://localhost:8080/resenias"
export const fetchReseniasByVendedor = createAsyncThunk('resenias/fetchByVendedor', async(vendedorId)=>{
    const {data} = await axios.get(URL+'/vendedor/'+vendedorId)
    return data
})

export const postResenia = createAsyncThunk('resenias/postResenia', async(newResenia, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.post(URL, newResenia, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
})

const reseniaSlice = createSlice({
    name : 'resenias',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        //funciones para actualizar el estado de forma SINCRONA
    },
    extraReducers: (builder) => { //peticiones ASINCRONAS
        builder
        .addCase(fetchReseniasByVendedor.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchReseniasByVendedor.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload
        
        })
        .addCase(fetchReseniasByVendedor.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
        //post de resenias
        .addCase(postResenia.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(postResenia.fulfilled, (state,action) => {
            state.loading = false,
            state.items = action.payload
        })
        .addCase(postResenia.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default reseniaSlice.reducer
