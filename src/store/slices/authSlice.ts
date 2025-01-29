import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isLoggedIn: boolean | null;
}
  
const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isLoggedIn: Boolean(localStorage.getItem('refreshToken'))
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action: PayloadAction<{accessToken: string, refreshToken: string}>,) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.isLoggedIn = false;
        },
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;