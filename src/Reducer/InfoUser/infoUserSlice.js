import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    "uid": "",
    "email": "",
    "displayName": "",
    "photoURL": "",
    "accessToken": "",
}

export const userSlice = createSlice({
    name: 'usuario',
    initialState: initialState,
    reducers: {
        dataUser: (state, actions) => {
            state.uid = actions.payload.uid;
            state.email = actions.payload.email;
            state.displayName = actions.payload.displayName;
            state.photoURL = actions.payload.photoURL;
            state.accessToken = actions.payload.accessToken;
        }
    },
})
export const { dataUser } = userSlice.actions
export default userSlice.reducer