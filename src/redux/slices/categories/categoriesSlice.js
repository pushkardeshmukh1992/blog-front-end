import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../global/globalSlices";
import BASE_URL from "../../../utils/baseURL";

// initialState

const INITIAL_STATE = {
  loading: false,
  error: null,
  categories: [],
  category: null,
  success: false,
};

// Public posts action
export const fetchCategoriesAction = createAsyncThunk(
  "cateogires/lists",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request

    try {
      const { data } = await axios.get(`${BASE_URL}/categories`, payload);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Categories slices
const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // handle pending state
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });

    // handle fulfilled state
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.categories = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    // handle rejected state
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
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
const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;
