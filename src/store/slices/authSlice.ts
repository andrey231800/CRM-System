import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tokensManager } from "../../helpers/TokensManager";

interface AuthState {
    accessToken: string | null;
    isLoggedIn: boolean | null;
}
  
const initialState: AuthState = {
    accessToken: tokensManager.getAccessToken(),
    isLoggedIn: tokensManager.hasAccessToken()
};

const updateState = (state: AuthState) => {
    state.accessToken = tokensManager.getAccessToken();
    state.isLoggedIn = tokensManager.hasAccessToken();
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action: PayloadAction<{accessToken: string, refreshToken: string}>,) {

            tokensManager.setAccessToken(action.payload.accessToken);
            tokensManager.setRefreshToken(action.payload.refreshToken);

            updateState(state);
        },
        logout(state) {

            tokensManager.clearTokens();

            updateState(state);

        },
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;