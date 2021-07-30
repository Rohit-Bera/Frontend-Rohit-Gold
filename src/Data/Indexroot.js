import { combineReducers } from "redux";
import storeReducer from "./Reducers/store.reducer";
import adminReducer from "./Reducers/adminstore.reducer";
import updateproductReducer from "./Reducers/updateproduct.reducer";
import clickedcollection from "./Reducers/hometocollection.reducer";
import viewPro from "./Reducers/viewProduct.reducer";
import searchedProduct from "./Reducers/searchProduct.reducer";
import chatReducer from "./Reducers/chat.reducer";
import allProduct from "./Reducers/hometocollection.reducer";

const rootReducer = combineReducers({
  storeReducer,
  adminReducer,
  updateproductReducer,
  clickedcollection,
  allProduct,
  viewPro,
  searchedProduct,
  chatReducer,
});

export default rootReducer;
