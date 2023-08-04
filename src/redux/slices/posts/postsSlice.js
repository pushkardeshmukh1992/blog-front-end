import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../global/globalSlices";
import BASE_URL from "../../../utils/baseURL";

// initialState

const INITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  success: false,
};

// Public posts action
export const fetchPublicPosts = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request

    try {
      const { data } = await axios.get(`${BASE_URL}/posts/public`, payload);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch single post action
export const getPostAction = createAsyncThunk(
  "posts/get-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // make request

    try {
      const { data } = await axios.get(`${BASE_URL}/posts/${postId}`);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Create post action
export const addPostAction = createAsyncThunk(
  "posts/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // conver payload to formData

    try {
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`${BASE_URL}/posts`, formData, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Users slices
const publicPostSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // handle pending state
    builder.addCase(fetchPublicPosts.pending, (state, action) => {
      state.loading = true;
    });

    // handle fulfilled state
    builder.addCase(fetchPublicPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    // handle rejected state
    builder.addCase(fetchPublicPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // handle pending state
    builder.addCase(addPostAction.pending, (state, action) => {
      state.loading = true;
    });

    // handle fulfilled state
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    // handle rejected state
    builder.addCase(addPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // handle pending state
    builder.addCase(getPostAction.pending, (state, action) => {
      state.loading = true;
    });

    // handle fulfilled state
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    // handle rejected state
    builder.addCase(getPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });

    // reset success action
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

// generate reducer
const postsReducer = publicPostSlice.reducer;

export default postsReducer;
