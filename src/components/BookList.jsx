// src/components/BookList.jsx
import React from "react";
import { Link } from "react-router-dom";  // Mengimpor Link

export default function BookList({ books, addToFavorites }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 mb-8 px-4">
      {books.map((book) => {
        const info = book.volumeInfo;

        return (
          <div
            key={book.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 m-4 cursor-pointer"
          >
            <img
              src={info.imageLinks?.thumbnail || "https://via.placeholder.com/128x195?text=No+Image"}
              alt={info.title}
              className="mb-4 w-full h-60 object-cover rounded-xl"
            />

            {/* Gunakan Link untuk navigasi ke halaman detail */}
            <Link to={`/book/${book.id}`}>
              <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{info.title}</h3>
            </Link>

            <p className="text-sm text-gray-600 line-clamp-1">{info.authors?.join(", ") || "Tidak diketahui"}</p>

            {/* Tombol untuk menambahkan buku ke favorit */}
            <button
              onClick={() => addToFavorites(book)}  // Panggil fungsi addToFavorites saat tombol diklik
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tambah ke Favorit
            </button>
          </div>
        );
      })}
    </div>
  );
}
