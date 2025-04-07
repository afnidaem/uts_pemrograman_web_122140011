// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";

const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
});

export default store;  // Pastikan kita mengekspor store sebagai default
