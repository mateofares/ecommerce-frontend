import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const URL = "http://localhost:8080/api/auth"
export const loginUsuario = createAsyncThunk('auth/fetchUsuario', async(newLogin)=>{
    const {data} = await axios.post(URL+"/authenticate",newLogin)
    return data
})

const authSlice = createSlice({
    name : 'usuario',
    initialState: {
        usuario: null,
        token:null,
        rol:null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => { //peticiones ASINCRONAS
        builder
        .addCase(loginUsuario.pending, (state)=>{ //caso de que hacer mientras esta en pending
            state.loading = true,
            state.error = null
        })
        .addCase(loginUsuario.fulfilled, (state,action) => {
            state.loading = false,
            state.token = action.payload.access_token,
            state.usuarioId = action.payload.user_id
            state.rol = action.payload.user_rol
        })
        .addCase(loginUsuario.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        } )
    }
})

export default authSlice.reducer