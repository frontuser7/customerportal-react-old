import { configureStore } from "@reduxjs/toolkit";
import getRestaurantSlice from "./getRestaurantSlice";
import getLanguage from "./geLanguageSlice";
import restoTableIdSlice from "./restoTableIdSlice";
import sessionSlice from "./getSessionSlice";
import menuListSlice from "./getMenuListSlice";
import addRemoveItemsSlice from "./addRemoveItemsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import personalDetailsSlice from "./personalDetailsSlice";
import getFilteredItemsSlice from "./getFilteredItemsSlice";
import activeCatBtnSlice from "./activeCatBtnSlice";
import activeSubCatBtnSlice from "./activeSubCatBtnSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  restoData: getRestaurantSlice,
  langData: getLanguage,
  resto_TableId: restoTableIdSlice,
  session: sessionSlice,
  menuList: menuListSlice,
  filteredItemList: getFilteredItemsSlice,
  addToCartItems: addRemoveItemsSlice,
  personalDetails: personalDetailsSlice,
  activeCategory: activeCatBtnSlice,
  activeSubCategory: activeSubCatBtnSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
