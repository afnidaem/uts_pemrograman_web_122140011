// src/components/FavoriteBooks.jsx
import React, { useState, useEffect } from "react";

export default function FavoriteBooks() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Ambil data favorit dari localStorage saat pertama kali dimuat
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    setFavorites(savedFavorites);
  }, []);

  const addFavorite = (book) => {
    // Cek jika buku sudah ada dalam daftar favorit
    if (!favorites.some((favorite) => favorite.id === book.id)) {
      const updatedFavorites = [...favorites, book];
      setFavorites(updatedFavorites);
      localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
      alert("Buku berhasil ditambahkan ke dalam favorite!");
    } else {
      alert("Buku sudah ada di dalam favorite!");
    }
  };

  const removeFavorite = (id) => {
    // Hapus buku dari daftar favorit berdasarkan id
    const updatedFavorites = favorites.filter((book) => book.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
    alert("Buku berhasil dihapus dari favorite!");
  };

  // Jika tidak ada buku favorit
  if (!favorites.length) {
    return <p className="text-center text-gray-500">Tidak ada buku favorit.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Buku Favorit</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((book) => {
          const info = book.volumeInfo;

          return (
            <div key={book.id} className="border p-4 rounded shadow relative">
              {/* Tombol untuk menghapus buku dari favorit */}
              <button
                onClick={() => removeFavorite(book.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ×
              </button>
              <img
                src={info.imageLinks?.thumbnail || "https://via.placeholder.com/128x195?text=No+Image"}
                alt={info.title}
                className="mb-2 w-full h-48 object-cover"
              />
              <h3 className="font-semibold text-lg">{info.title}</h3>
              <p className="text-sm text-gray-600">
                {info.authors?.join(", ") || "Tidak diketahui"}
              </p>

              {/* Tombol untuk menambahkan buku ke favorit */}
              <button
                onClick={() => addFavorite(book)}
                className="absolute bottom-2 right-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Tambah ke Favorit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
