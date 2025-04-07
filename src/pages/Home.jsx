// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isFavoriteTab, setIsFavoriteTab] = useState(false); // State untuk tab aktif
  const navigate = useNavigate();

  // Ambil data buku dari API
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=react");
      const data = await response.json();
      setBooks(data.items);
    };

    fetchBooks();
  }, []);

  // Mengambil daftar buku favorit dari localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    setFavoriteBooks(savedFavorites);
  }, []);

  // Fungsi untuk menangani klik tombol favorit
  const handleAddToFavorites = (book) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];

    if (!savedFavorites.some((favorite) => favorite.id === book.id)) {
      savedFavorites.push(book);
      localStorage.setItem("favoriteBooks", JSON.stringify(savedFavorites));
      alert("Buku berhasil ditambahkan ke dalam favorite!");
    } else {
      alert("Buku sudah ada di dalam favorite!");
    }
  };

  // Fungsi untuk menangani pemilihan buku
  const handleSelectBook = (book) => {
    // Navigasi ke halaman detail buku
    navigate(`/book/${book.id}`);
  };

  // Fungsi untuk mengalihkan tab
  const handleTabChange = (tab) => {
    setIsFavoriteTab(tab === "favorite");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">myNovel</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => handleTabChange("home")}
          className={`text-xl ${!isFavoriteTab ? "font-bold" : ""}`}
        >
          Daftar Buku
        </button>
        <button
          onClick={() => handleTabChange("favorite")}
          className={`text-xl ${isFavoriteTab ? "font-bold" : ""}`}
        >
          Favorit
        </button>
      </div>

      {/* Tampilan berdasarkan tab yang aktif */}
      {isFavoriteTab ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Buku Favorit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favoriteBooks.length > 0 ? (
              favoriteBooks.map((book) => (
                <BookCard key={book.id} book={book} onSelect={handleSelectBook} />
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada buku favorit.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Daftar Buku</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={handleSelectBook}
                addToFavorites={handleAddToFavorites} // Mengirimkan fungsi ke BookCard untuk menambahkan buku ke favorit
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
