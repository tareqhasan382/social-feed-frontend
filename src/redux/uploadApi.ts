import { baseApi } from "./api/baseApi";

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<{ success: boolean; data: string }, FormData>({
      query: (body) => ({
        url: "/api/v1/upload",
        method: "POST",
        body,
        // FormData doesn't need Content-Type header, let the browser set it with boundary
        formData: true,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
