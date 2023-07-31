import { createAsyncThunk } from "@reduxjs/toolkit";

// reset success action
export const resetSuccessAction = createAsyncThunk(
  "reset-success-action",
  () => {
    return true;
  }
);

// reset error action
export const resetErrorAction = createAsyncThunk("reset-error-action", () => {
  return true;
});
