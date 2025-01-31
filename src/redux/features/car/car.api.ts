import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/cars`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["cars"],
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
    addCar: builder.mutation({
      query: (formData) => ({
        url: `/cars`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["cars"],
    }),
    updateCar: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useDeleteCarMutation,
  useAddCarMutation,
  useUpdateCarMutation,
} = carApi;
