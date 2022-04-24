import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IUser, ILoginRequest } from './user.types'

export const userApi = createApi({
    reducerPath: 'api/users',
    baseQuery: fetchBaseQuery({
        baseUrl: '/'
    }),
    endpoints: build => ({
        loginUser: build.mutation<IUser, ILoginRequest>({      
            query: ({ ...request }) => ({
            url: '/Account',
            method: 'POST',
            body: request,
          })
        })
    })
})

export const { useLoginUserMutation } = userApi