import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searched product",
  initialState: {
    searchvalue: "",
    products: "",
  },
  reducers: {
    searchedProduct: (state, action) => {
      // console.log("the value : ", action.payload.search);
      // console.log("action.data : ", action.payload.data);

      state.searchvalue = action.payload.search;
      state.products = action.payload.data;
      // console.log("state.products: ", state.products);
    },
  },
});

export const { searchedProduct } = searchSlice.actions;

export default searchSlice.reducer;
