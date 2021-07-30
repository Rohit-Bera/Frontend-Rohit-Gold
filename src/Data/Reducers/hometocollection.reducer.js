import { createSlice } from "@reduxjs/toolkit";

const h2cSlice = createSlice({
  name: "home to collection slice",
  initialState: {
    productname: "",
    products: "",
  },
  reducers: {
    clickedcollection: (state, action) => {
      // console.log("action.payload", action.payload.collectionname);

      state.productname = action.payload.collectionname;
    },
    allProduct: (state, action) => {
      // console.log("action.payload : ", action.payload);

      state.products = action.payload.products;
    },
  },
});

export const { clickedcollection, allProduct } = h2cSlice.actions;

export default h2cSlice.reducer;
