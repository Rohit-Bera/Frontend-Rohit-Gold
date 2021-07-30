import { createSlice } from "@reduxjs/toolkit";

const updateproductSlice = createSlice({
  name: "updateproduct",
  initialState: {
    productName: "",
    collectionName: "",
    price: null,
    weight: "",
    purity: "",
    category: "",
    productImage: null,
    availableStatus: false,
    id: null,
  },
  reducers: {
    updateProductr: (state, action) => {
      // console.log("payload :", action.payload);

      const {
        productName,
        collectionName,
        price,
        weight,
        purity,
        category,
        productImage,
        availableStatus,
        _id,
      } = action.payload.item;

      state.productName = productName;
      state.productImage = productImage;
      state.collectionName = collectionName;
      state.availableStatus = availableStatus;
      state.price = price;
      state.weight = weight;
      state.purity = purity;
      state.category = category;
      state.id = _id;
    },
  },
});

export const { updateProductr } = updateproductSlice.actions;

export default updateproductSlice.reducer;
