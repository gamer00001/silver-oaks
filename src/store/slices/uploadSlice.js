import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fileUpload = asyncCatch(
  "uploadSlice/fileUpload",
  async ({ files = [] }) => {
    const formData = new FormData();
    for (const file of files) {
      formData.append("file", file);
    }

    return axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/upload-files`,
      formData
    );
  }
);

export const imageUpload = asyncCatch(
  "uploadSlice/imageUpload",
  async ({ images = [] }) => {
    const formData = new FormData();
    for (const image of images) {
      formData.append("image", image);
    }

    return axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/upload-images`,
      formData
    );
  }
);

const initialState = {
  fileUploadData: {
    loading: false,
  },

  imageUploadData: {
    loading: false,
  },
};

const uploadSlice = createSlice({
  name: "uploadSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // file upload
    builder.addCase(fileUpload.pending, (state) => {
      state.fileUploadData = {
        loading: true,
      };
    });
    builder.addCase(fileUpload.fulfilled, (state) => {
      state.fileUploadData = {
        loading: false,
      };
    });
    builder.addCase(fileUpload.rejected, (state) => {
      state.fileUploadData = {
        loading: false,
      };
    });

    // image upload
    builder.addCase(imageUpload.pending, (state) => {
      state.imageUploadData = {
        loading: true,
      };
    });
    builder.addCase(imageUpload.fulfilled, (state) => {
      state.imageUploadData = {
        loading: false,
      };
    });
    builder.addCase(imageUpload.rejected, (state) => {
      state.imageUploadData = {
        loading: false,
      };
    });
  },
});

// export const {  } = uploadSlice.actions;
export default uploadSlice.reducer;
