import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../global/globalSlices";
import BASE_URL from "../../../utils/baseURL";

// initialState

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  user: null,
  success: false,
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
      const { data } = await axios.post(`${BASE_URL}/users/login`, payload);

      // save the user to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Register action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request

    try {
      const { data } = await axios.post(`${BASE_URL}/users/register`, payload);

      // save the user to local storage
      localStorage.setItem("userInfo", JSON.stringify(data.newUser));

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Logout action
export const logoutAction = createAsyncThunk("users/logout", async () => {
  // remove token from local storage
  console.log("removing token");
  localStorage.removeItem("userInfo");
  return true;
});

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

    // register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });

    // handle fulfilled state
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload.newUser;
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    // handle rejected state
    builder.addCase(registerAction.rejected, (state, action) => {
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
const usersReducer = usersSlice.reducer;

export default usersReducer;
