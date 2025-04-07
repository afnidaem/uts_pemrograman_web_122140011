// src/components/BookCard.jsx
import React from 'react';

export default function BookCard({ book, onSelect }) {
  const info = book.volumeInfo;

  return (
    <div
      key={book.id}
      className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 m-4 cursor-pointer"
      onClick={() => onSelect(book)}
    >
      <img
        src={info.imageLinks?.thumbnail || "https://via.placeholder.com/128x195?text=No+Image"}
        alt={info.title}
        className="mb-4 w-full h-60 object-cover rounded-xl"
      />

      <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{info.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-1">{info.authors?.join(", ") || "Tidak diketahui"}</p>
    </div>
  );
}
