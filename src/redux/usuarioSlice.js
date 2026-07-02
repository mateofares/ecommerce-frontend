import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const URL = "http://localhost:8080/usuarios"

export const fetchUsuarios = createAsyncThunk('usuarios/fetchUsuarios', async(_, { getState })=>{
    const token = getState().auth.token
    const {data} = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } })
    return data
})

export const eliminarLogicoUsuario = createAsyncThunk('usuarios/eliminarLogico', async(id, { getState })=>{
    const token = getState().auth.token
    await axios.patch(URL+'/'+id+'/eliminar-logico', {}, { headers: { Authorization: `Bearer ${token}` } })
    return id
})

const usuarioSlice = createSlice({
    name: 'usuarios',
    initialState: {
        items: [],
        fetched: false,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsuarios.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchUsuarios.fulfilled, (state, action) => {
            state.loading = false,
            state.items = action.payload
            state.fetched = true
        })
        .addCase(fetchUsuarios.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.error.message
        })
        .addCase(eliminarLogicoUsuario.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(eliminarLogicoUsuario.fulfilled, (state, action) => {
            state.loading = false,
            state.items = state.items.filter(u => u.id !== action.payload)
        })
        .addCase(eliminarLogicoUsuario.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.error.message
        })
    }
})

export default usuarioSlice.reducer
