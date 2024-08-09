import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const asyncCatch = (name, cb, type) =>
  createAsyncThunk(
    name,
    async (
      {
        payload = {},
        isRunDefaultError = true,
        onError = () => {},
        onSuccess = () => {},
      } = {},
      { rejectWithValue, getState, dispatch, ...rest }
    ) => {
      try {
        payload.config = {
          headers: {
            Authorization: `Bearer ${
              getState().authReducer?.loginUserData?.token
            }`,
            "content-type": type ?? "application/json",
          },
        };
        const { data } = await cb(payload, {
          rejectWithValue,
          getState,
          dispatch,
          ...rest,
        });
        console.log(data);
        onSuccess && onSuccess(data);
        return data;
      } catch (error) {
        console.log(error);

        if (error.message === "Network Error") {
          toast.error(
            "No response from the server. Please check your internet connection."
          );
          return rejectWithValue(
            "No response from the server. Please check your internet connection."
          );
        } else if (isRunDefaultError && !axios.isCancel(error)) {
          if (error?.response?.status === 401) {
            dispatch({ type: "authSlice/session-expired" });
            return rejectWithValue("");
          } else if (typeof error?.response?.data?.message === "string") {
            console.log(error?.response?.data?.message);
            toast.error("Invalid error");
          } else if (typeof error?.response?.data?.error === "string") {
            console.log(error?.response?.data?.error);
            toast.error("Invalid error");
          } else if (typeof error?.response?.data === "string") {
            console.log(error?.response?.data);
            toast.error("Invalid error");
          } else {
            toast.error("Something went wrong! Please try again.");
          }
        }

        onError && onError(error);
      }
    }
  );

export default asyncCatch;
