import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllBlogs = asyncCatch(
  "blogSlice/getAllBlogs",
  async ({ page = 1, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/blog?sortBy=-updatedAt&page=${page}${
        query ? `&query=${query}` : ""
      }`
    )
);

export const deleteBlog = asyncCatch("blogSlice/deleteBlog", async ({ _id }) =>
  axios.delete(`${CONSTANTS.VITE_BACKEND_API_URL}/blog/${_id}`)
);

export const createBlog = asyncCatch(
  "blogSlice/createBlog",
  async ({ body, config }) =>
    axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/blog`, body, config)
);

export const editBlog = asyncCatch(
  "blogSlice/editBlog",
  async ({ body, config, _id }) =>
    axios.patch(`${CONSTANTS.VITE_BACKEND_API_URL}/blog/${_id}`, body, config)
);

export const getSingleBlog = asyncCatch(
  "blogSlice/getSingleBlog",
  async ({ _id }) => axios.get(`${CONSTANTS.VITE_BACKEND_API_URL}/blog/${_id}`)
);

const initialState = {
  getAllBlogsData: {
    data: [],
    totalPages: 0,
    loading: false,
  },

  deleteBlogData: {
    loading: false,
  },

  createBlogData: {
    loading: false,
  },

  getSingleBlogData: {
    loading: false,
    data: null,
  },

  editBlogData: {
    loading: false,
  },
};

const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all blogs
    builder.addCase(getAllBlogs.pending, (state) => {
      state.getAllBlogsData.loading = true;
    });
    builder.addCase(getAllBlogs.fulfilled, (state, { payload }) => {
      state.getAllBlogsData = {
        loading: false,
        data: payload?.data || [],
        totalPages: payload?.totalPages || 0,
      };
    });
    builder.addCase(getAllBlogs.rejected, (state) => {
      state.getAllBlogsData = {
        loading: false,
      };
    });

    // delete blog
    builder.addCase(deleteBlog.pending, (state) => {
      state.deleteBlogData = {
        loading: true,
      };
    });
    builder.addCase(deleteBlog.fulfilled, (state) => {
      state.deleteBlogData = {
        loading: false,
      };
    });
    builder.addCase(deleteBlog.rejected, (state) => {
      state.deleteBlogData = {
        loading: false,
      };
    });

    // create blog
    builder.addCase(createBlog.pending, (state) => {
      state.createBlogData = {
        loading: true,
      };
    });
    builder.addCase(createBlog.fulfilled, (state) => {
      state.createBlogData = {
        loading: false,
      };
    });
    builder.addCase(createBlog.rejected, (state) => {
      state.createBlogData = {
        loading: false,
      };
    });

    // get single blog
    builder.addCase(getSingleBlog.pending, (state) => {
      state.getSingleBlogData = {
        loading: true,
        data: null,
      };
    });
    builder.addCase(getSingleBlog.fulfilled, (state, { payload }) => {
      state.getSingleBlogData = {
        loading: false,
        data: payload,
      };
    });
    builder.addCase(getSingleBlog.rejected, (state) => {
      state.getSingleBlogData = {
        loading: false,
        data: null,
      };
    });

    // edit blog
    builder.addCase(editBlog.pending, (state) => {
      state.editBlogData = {
        loading: true,
      };
    });
    builder.addCase(editBlog.fulfilled, (state) => {
      state.editBlogData = {
        loading: false,
      };
    });
    builder.addCase(editBlog.rejected, (state) => {
      state.editBlogData = {
        loading: false,
      };
    });
  },
});

// export const {  } = blogSlice.actions;
export default blogSlice.reducer;
