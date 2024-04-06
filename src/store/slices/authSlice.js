import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = asyncCatch("authSlice/loginUser", async ({ body }) =>
  axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/api/auth/login`, body)
);

export const forgetPassword = asyncCatch(
  "authSlice/forgetPasword",
  async ({ body }) =>
    axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/admin/auth/forgot-password`,
      body
    )
);

export const resetPassword = asyncCatch(
  "authSlice/resetPassword",
  async ({ body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/admin/auth/reset-password`,
      body
    )
);

export const getUser = asyncCatch("authSlice/getUser", async ({ config }) =>
  axios.get(`${CONSTANTS.VITE_BACKEND_API_URL}/admin/auth/getUser`, config)
);

export const updateProfile = asyncCatch(
  "authSlice/updateProfile",
  async ({ body, config }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/admin/auth/update`,
      body,
      config
    )
);

export const changePassword = asyncCatch(
  "authSlice/changePassword",
  async ({ body, config }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/admin/auth/change-password`,
      body,
      config
    )
);

const initialState = {
  loginUserData: {
    user: null,
    userDetail: null,
    token: "",
    loading: false,
  },

  isSessionExpired: false,

  forgetPasswordData: {
    loading: false,
  },

  resetPasswordData: {
    loading: false,
  },

  updateProfileData: {
    loading: false,
  },

  changePasswordData: {
    loading: false,
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetAuthReducer: () => initialState,
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loginUserData = {
        ...initialState.loginUserData,
        loading: true,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      debugger
      state.loginUserData = {
        user: "Teacher",
        userDetail: payload?.role === "ROLE_TEACHER" ?  payload?.teacher : payload?.student,
        token: payload?.accessToken,
        loading: false,
      };
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loginUserData = {
        ...initialState.loginUserData,
        loading: false,
      };
    });
    // get user
    builder.addCase(getUser.pending, (state) => {
      state.loginUserData = {
        ...state.loginUserData,
        loading: true,
      };
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loginUserData = {
        user: payload,
        token: state.loginUserData.token,
        loading: false,
      };
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loginUserData = {
        ...initialState.loginUserData,
        loading: false,
      };
    });

    // session expire
    builder.addCase("authSlice/session-expired", (state) => {
      state.isSessionExpired = true;
    });

    // forget password
    builder.addCase(forgetPassword.pending, (state) => {
      state.forgetPasswordData = {
        loading: true,
      };
    });
    builder.addCase(forgetPassword.fulfilled, (state) => {
      state.forgetPasswordData = {
        loading: false,
      };
    });
    builder.addCase(forgetPassword.rejected, (state) => {
      state.forgetPasswordData = {
        loading: false,
      };
    });

    // reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.resetPasswordData = {
        loading: true,
      };
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.resetPasswordData = {
        loading: false,
      };
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.resetPasswordData = {
        loading: false,
      };
    });

    // updateProfile
    builder.addCase(updateProfile.pending, (state) => {
      state.updateProfileData = {
        loading: true,
      };
    });
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.updateProfileData = {
        loading: false,
      };
      state.loginUserData.user = payload;
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.updateProfileData = {
        loading: false,
      };
    });

    // changePassword
    builder.addCase(changePassword.pending, (state) => {
      state.changePasswordData = {
        loading: true,
      };
    });
    builder.addCase(changePassword.fulfilled, (state, { payload }) => {
      state.changePasswordData = {
        loading: false,
      };
      state.loginUserData.user = payload;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.changePasswordData = {
        loading: false,
      };
    });
  },
});

export const { resetAuthReducer } = authSlice.actions;
export default authSlice.reducer;
