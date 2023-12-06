import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    "bNombre": "",
    "bCategoria": "",
}
export const mFiltro = createSlice({
    name: 'filtroInfo',
    initialState: initialState,
    reducers: {
        setFiltroData: (state, actions) => {
            state.bNombre = actions.payload.bNombre;
            state.bCategoria = actions.payload.bCategoria;
        }
    },
})
export const { setFiltroData } = mFiltro.actions
export default mFiltro.reducer