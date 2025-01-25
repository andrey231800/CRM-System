import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    isLoggedIn: boolean | null;
}
  
const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    isLoggedIn: Boolean(localStorage.getItem('accessToken'))
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.accessToken = null;
            state.isLoggedIn = false;
        },
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;