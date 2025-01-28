import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
  import { RootState } from '../store';

  const BASE_API = import.meta.env.VITE_API_URL
  
  const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });
  
  const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  > = async (args, api, extraOptions): Promise<any> => {
    const result = await baseQuery(args, api, extraOptions);
  
    // if (result?.error?.status === 404) {
    //   toast.error((result?.error?.data as { message: string })?.message);
    // }
    // if (result?.error?.status === 403) {
    //   toast.error((result?.error?.data as { message: string })?.message);
    // }
    // if (result?.error?.status === 401) {
    //   //* Send Refresh
    //   console.log('Sending refresh token');
  
    //   const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
    //     method: 'POST',
    //     credentials: 'include',
    //   });
  
    //   const data = await res.json();
  
    //   if (data?.data?.accessToken) {
    //     const user = (api.getState() as RootState).auth.user;
  
    //     api.dispatch(
    //       setUser({
    //         user,
    //         token: data.data.accessToken,
    //       })
    //     );
  
    //     result = await baseQuery(args, api, extraOptions);
    //   } else {
    //     api.dispatch(logout());
    //   }
    // }
  
    return result;
  };
  
  export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ["cars"],
    endpoints: () => ({}),
  });