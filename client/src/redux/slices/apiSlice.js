import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://scouts-managment-system-api-dev.onrender.com"
    : "";

const baseQuery = fetchBaseQuery({ baseUrl, credentials: "include" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Scouts"],
  endpoints: () => ({}),
});
