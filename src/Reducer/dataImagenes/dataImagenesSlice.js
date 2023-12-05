import { createSlice } from '@reduxjs/toolkit'
const initialState = [
    {
        "usuario": "",
        "nombreImagen": "",
        "rutaImagen": "",
        "fechaCarga": "",
        "descripcion": "",
        "comentarios": []
    }
]
export const imagenesSlice = createSlice({
    name: 'imagenes',
    initialState: initialState,
    reducers: {
        setDataImagenes: (state, actions) => {
            state.usuario = actions.payload.usuario;
            state.nombreImagen = actions.payload.nombreImagen;
            state.rutaImagen = actions.payload.rutaImagen;
            state.photoURL = actions.payload.photoURL;
            state.accessToken = actions.payload.accessToken;
        }
    },
})
export const { setDataImagenes } = imagenesSlice.actions
export default imagenesSlice.reducer