// import { isArray } from "lodash";
import axios from "axios";

// import { toast } from "react-toastify";
import { toast } from "./index";
import { resetAuthReducer } from "@/store";
import { isCurrentUserStudent } from "./helper";

// import { logoutUser } from "../api-handlers/login";

let showAlert = true;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleError = (error, dispatch) => {
  console.log({ error }, error.status);
  if (axios.isAxiosError(error)) {
    // Axios-specific error handling
    console.error("Axios error:", error.response?.data || error?.message);
    // You can customize the error handling based on status codes, etc.
    // For example:
    if (error.response?.status === 401 && showAlert) {
      dispatch(resetAuthReducer());
      toast.success("Logged out successfully!");

      const redirectUrl = isCurrentUserStudent() ? "/student-login" : "/login";

      localStorage.clear();
      sessionStorage.clear();
      showAlert = false;
      toast.error("Session has been expired!");

      window.location.href = redirectUrl;

      //   alert("Session has been expired!");
      return "";
      // Handle unauthorized access
    } else if (error.code === "ECONNABORTED") {
      // Handle timeout error
      toast.error("Request timeout!");
    } else if (error.message.includes("Network Error")) {
      // Handle no internet connection
      toast.error("Unable to connect to server");
    } else if (error.response?.status && error.response.status >= 500) {
      // Handle no internet connection
      toast.error("Some Server Error Occured!");
    } else {
      // Handle other status codes or Axios-related errors
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { message } = error?.response?.data;
      if (message.length > 0) {
        message.map((item) => {
          toast.error(item);
        });
        return message;
      } else {
        toast.error(message);
      }
    }
  } else {
    // Other types of errors
    console.error("Non-Axios error:", error);
    toast.error("Something went wrong!");
    // Handle other exceptions here
    return "Something went wrong!";
  }

  return JSON.stringify(error.response?.data.message);
};
