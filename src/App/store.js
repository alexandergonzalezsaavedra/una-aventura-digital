import { configureStore } from '@reduxjs/toolkit'
import infoUsuarioReducer from '../Reducer/InfoUser/infoUserSlice'
import infoFiltroReducer from '../Reducer/FiltroInfo/FiltroSlice'
export const store = configureStore({
    reducer: {
        dataUsuario: infoUsuarioReducer,
        dataFiltro:infoFiltroReducer
    },
})