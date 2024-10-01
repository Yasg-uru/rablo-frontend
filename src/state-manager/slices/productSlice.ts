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
export const PriceLessThanValue = createAsyncThunk(
  "product/price",
  async (value: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/price/${value}`);
      console.log("this is a response data of the products :", response.data);
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const RatingHigherThanValue = createAsyncThunk(
  "product/rating",
  async (value: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/rating/${value}`);
      console.log("this is a response data of the products :", response.data);
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const OnlyFeatured = createAsyncThunk(
  "product/featured",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product/featured");
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
    builder.addCase(OnlyFeatured.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(OnlyFeatured.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(OnlyFeatured.fulfilled, (state, action) => {
      state.products = action.payload?.featuredProducts;
      state.isLoading = false;
    });
    builder.addCase(PriceLessThanValue.fulfilled, (state, action) => {
      state.products = action.payload?.products;
      state.isLoading = false;
    });
    builder.addCase(PriceLessThanValue.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(PriceLessThanValue.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(RatingHigherThanValue.fulfilled, (state, action) => {
      state.products = action.payload?.products;
      state.isLoading = false;
    });
    builder.addCase(RatingHigherThanValue.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(RatingHigherThanValue.pending, (state) => {
      state.isLoading = true;
    });
  },
});
export const {} = productSlice.actions;
export default productSlice.reducer;
