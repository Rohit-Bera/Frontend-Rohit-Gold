import { createSlice } from "@reduxjs/toolkit";

//reducer
const viewSlice = createSlice({
  name: "view product",
  initialState: {
    availableStatus: null,
    category: "",
    collectionName: "",
    price: "",
    productImage: "",
    productName: "",
    purity: "",
    weight: "",
    _id: "",
  },
  reducers: {
    //   actions
    viewPro: (state, action) => {
      // console.log("action.payload", action.payload);

      state.availableStatus = action.payload.item.availableStatus;
      state._id = action.payload.item._id;
      state.category = action.payload.item.category;
      state.collectionName = action.payload.item.collectionName;
      state.price = action.payload.item.price;
      state.productImage = action.payload.item.productImage;
      state.productName = action.payload.item.productName;
      state.purity = action.payload.item.purity;
      state.weight = action.payload.item.weight;
      // console.log("state.weight: ", state.weight);
    },
  },
});

export const { viewPro } = viewSlice.actions;

export default viewSlice.reducer;
