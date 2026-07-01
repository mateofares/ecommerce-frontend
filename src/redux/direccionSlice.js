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
    }
})

export default direccionSlice.reducer
