// src/redux/favoriteSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Ambil data favorit dari localStorage jika ada
const loadFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

const initialState = {
  favorites: loadFavoritesFromLocalStorage(),
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const newBook = action.payload;
      // Pastikan buku tidak duplikat
      if (!state.favorites.some(book => book.id === newBook.id)) {
        state.favorites.push(newBook);
        // Simpan daftar favorit ke localStorage
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(book => book.id !== action.payload.id);
      // Update localStorage
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
