import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthData, UserProfile, UserRegistration } from "../../types/IAuth";
import baseQueryWithReauth from "./baseQueryWithReauth";
import { authActions } from "../slices/authSlice";

export const authApi = createApi({

    // refetchOnFocus: true,
    // refetchOnReconnect: true,
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        register: builder.mutation({
          query: (userData: UserRegistration) => ({
            url: '/auth/signup',
            method: 'POST',
            body: userData
          }),
          
        }),

        login: builder.mutation({
          query: (creditentials: AuthData) => ({
            url: '/auth/signin',
            method: 'POST',
            body: creditentials,
          }),
          async onQueryStarted(_, {dispatch, queryFulfilled}) {
            try {
              const { data } = await queryFulfilled;
              // const { accessToken, refreshToken } = data;

              // localStorage.setItem("accessToken", accessToken);
              // localStorage.setItem("refreshToken", refreshToken);

              dispatch(authActions.setTokens(data));
              
            } catch(e) {
              // throw new Error('Login failed')
              console.error(e);
            }
          }
          
        }),

        logout: builder.mutation<void, void>({
          query: () => ({
            url: '/user/logout',
            method: 'POST'
          }),

          async onQueryStarted(_, {dispatch}) {

            dispatch(authActions.logout());
              
          }
        }),

        getUserProfile: builder.query<UserProfile, void>({
           query: () => ({
            url: '/user/profile',
            method: "GET"
           })
        })

    }),
})

export const {useRegisterMutation, useLoginMutation, useLogoutMutation, useGetUserProfileQuery} = authApi;