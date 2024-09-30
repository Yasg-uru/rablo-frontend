import { authState } from "@/types/auth-types/authstate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helper/axiosinstance";
import { RegistrationFormSchema } from "@/pages/auth/register";
const initialState: authState = {
  isLoading: false,
  isLoggedIn: false,
  userinfo: null,
};
export const Register = createAsyncThunk(
  "auth/register",
  async (formData:RegistrationFormSchema, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("user/register", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(Register.fulfilled, (state, action) => {
      state.userinfo = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(Register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(Register.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
