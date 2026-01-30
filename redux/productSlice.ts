import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "@/lib/axios";
import { Product } from "@/types/Product";

interface ProductState {
  items: Product[];
  status: "idle" | "loading" | "success" | "error";
}

const initialState: ProductState = {
  items: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await api.get("https://fakestoreapi.com/products");
  return res.data as Product[];
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchProducts.rejected, state => {
        state.status = "error";
      });
  }
});

export default productSlice.reducer;
