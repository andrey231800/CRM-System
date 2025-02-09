type Token = string | null;

class TokensManager {

    private accessToken: Token;

    constructor() {
        this.accessToken = localStorage.getItem('accessToken');
    }

    getAccessToken(): Token {
        return this.accessToken;
    }

    getRefreshToken(): Token {
        return localStorage.getItem('refreshToken')
    }

    setAccessToken(value: string) {
        localStorage.setItem('accessToken', value);
        this.accessToken = value
    }

    setRefreshToken(value: string) {
        localStorage.setItem('refreshToken', value);
    }

    private clearAccessToken() {
        localStorage.removeItem('accessToken');
        this.accessToken = null;
    }

    private clearRefreshToken() {
        localStorage.removeItem('refreshToken');
    }

    clearTokens() {
        this.clearAccessToken();
        this.clearRefreshToken();
    }

    hasAccessToken(): boolean {
        return this.accessToken !== null
    }
}

export const tokensManager = new TokensManager()