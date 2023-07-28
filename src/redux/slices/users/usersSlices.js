import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initialState

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  users: null,
  success: false,
  isUpdated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordReset: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

// Login action

export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request

    try {
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/users/login",
        payload
      );

      // save the user to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Users slices
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // Login

    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });

    // handle fulfilled state
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    // handle rejected state
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
