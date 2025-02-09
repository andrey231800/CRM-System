import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { authActions } from "../slices/authSlice";
import { Token } from "../../types/IAuth";
import { tokensManager } from "../../helpers/TokensManager";

const baseUrl = "https://easydev.club/api/v1";

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // console.log(result)

    if ( result.error?.status === 'PARSING_ERROR') {

        try {
            const refreshResult = (await baseQuery(
                {
                    url:'/auth/refresh',
                    method: "POST",
                    body: {refreshToken: tokensManager.getRefreshToken()}
                }, 
                api,
                extraOptions
            )) as {data: Token}

            // console.log(refreshResult)
    
            if (refreshResult.data) {
    
                api.dispatch(authActions.setTokens(refreshResult.data))
                
                result = await baseQuery(args, api, extraOptions)
    
                console.log('logIn');
    
            } else {
                
                throw new Error('Error fetching data!');
    
            }
        } catch(e) {
            api.dispatch(authActions.logout());

            console.log('logout')
        }

        
    }
    return result;
}

export default baseQueryWithReauth;