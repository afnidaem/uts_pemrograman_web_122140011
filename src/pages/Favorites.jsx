// src/pages/FavoriteBooks.jsx
import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

export default function FavoriteBooks() {
  const [favorites, setFavorites] = useState([]);

  // Ambil data favorit dari localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Jika tidak ada buku favorit, tampilkan pesan
  if (!favorites.length) {
    return <p className="text-center text-gray-500">Tidak ada buku favorit.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Buku Favorit</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {favorites.map((book) => (
          <BookCard key={book.id} book={book} /> 
        ))}
      </div>
    </div>
  );
}
