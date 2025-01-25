import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { authActions } from "../slices/authSlice";
import { Token } from "../../types/IAuth";

const baseUrl = "https://easydev.club/api/v2";

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include'
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // console.log(result );

    if (result.meta && result.meta.response?.status === 401) {

        const refreshResult = (await baseQuery(
            {
                url:'/auth/refresh',
                method: "POST"
            }, 
            api,
            extraOptions
        )) as {data: Token}

        if (refreshResult.data) {
          
            const {accessToken} = refreshResult.data;
            localStorage.setItem('accessToken', accessToken);

            api.dispatch(authActions.setAccessToken(accessToken))
            
            result = await baseQuery(args, api, extraOptions)

            console.log('logIn');

        } else {
            api.dispatch(authActions.logout());

            console.log('logout')

        }
    }
    return result;
}

export default baseQueryWithReauth;