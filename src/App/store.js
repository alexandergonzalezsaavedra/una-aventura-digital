import { configureStore } from '@reduxjs/toolkit'
import infoUsuarioReducer from '../Reducer/InfoUser/infoUserSlice'
export const store = configureStore({
    reducer: {
        dataUsuario: infoUsuarioReducer,
    },
})