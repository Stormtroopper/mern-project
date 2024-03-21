import { configureStore, createSlice } from '@reduxjs/toolkit';
const authenticateSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) { state.isLoggedIn = true },
        logout(state) {
            state.isLoggedIn = false
        },
    }
});
export const authenticateActions = authenticateSlice.actions;
export const store = configureStore({
    reducer: authenticateSlice.reducer
})