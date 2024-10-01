import axiosInstance from "@/helper/axiosinstance";
import { productState } from "@/types/product-types/productSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: productState = {
  isLoading: false,
  products: [],
};
export const fetchProducts = createAsyncThunk(
  "product/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product", {
        withCredentials: true,
      });
      console.log("this is a response data of the products :", response.data);
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload?.products;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
  },
});
export const {} = productSlice.actions;
export default productSlice.reducer;
