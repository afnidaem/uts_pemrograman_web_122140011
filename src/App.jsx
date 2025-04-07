// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";  // Menggunakan Link untuk navigasi
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import FavoriteBooks from "./components/FavoriteBooks";
import Loading from "./components/Loading";

const API_KEY = "AIzaSyD2Op7TOY-xgNL3EZ9pOMc3_8PKYP1AUFU"; // Ganti dengan API key milikmu

export default function App() {
  const [search, setSearch] = useState("");  // Menyimpan kata kunci pencarian
  const [books, setBooks] = useState([]);  // Menyimpan hasil pencarian
  const [recommendedBooks, setRecommendedBooks] = useState([]);  // Menyimpan rekomendasi buku
  const [isSearching, setIsSearching] = useState(false);  // Menandakan apakah sedang mencari
  const [isLoading, setIsLoading] = useState(false);  // Menandakan apakah data sedang dimuat

  // Fungsi untuk melakukan pencarian buku
  const searchBooks = async () => {
    if (!search.trim()) return;  // Jika pencarian kosong, tidak melakukan apa-apa

    setIsLoading(true);
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${API_KEY}`);
      const data = await response.json();
      setBooks(data.items || []);  // Menyimpan hasil pencarian ke state books
      setIsSearching(true);  // Menandakan bahwa pencarian telah selesai
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menambahkan buku ke favorit dan menyimpannya ke localStorage
  const addToFavorites = (book) => {
    const saved = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    if (!saved.some((favorite) => favorite.id === book.id)) {
      saved.push(book);  // Menambahkan buku ke dalam daftar favorit
      localStorage.setItem("favoriteBooks", JSON.stringify(saved));
      alert("Buku berhasil ditambahkan ke dalam favorite!");
    } else {
      alert("Buku sudah ada di dalam favorite!");
    }
  };

  // Mengambil buku rekomendasi ketika komponen pertama kali dimuat
  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10&key=${API_KEY}`);
        const data = await response.json();
        const randomBooks = data.items.sort(() => Math.random() - 0.5).slice(0, 5);  // Mengambil 5 buku acak
        setRecommendedBooks(randomBooks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecommendedBooks();  // Memanggil fungsi untuk mendapatkan rekomendasi buku
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-4">MyLibrare</h1>

      {/* Navigasi ke halaman utama dan halaman favorit */}
      <div className="flex justify-center gap-4 mb-8">
        <Link to="/" className="text-xl font-bold">Daftar Buku</Link>
        <Link to="/favorites" className="text-xl font-bold">Favorit</Link>
      </div>

      {/* Input untuk mencari buku */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Cari buku..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}  // Mengubah state search saat pengguna mengetik
          className="border p-2 flex-1 rounded"
        />
        <button onClick={searchBooks} className="bg-blue-600 text-white px-4 py-2 rounded">
          Cari
        </button>
      </div>

      {isLoading ? (
        <Loading />  // Menampilkan komponen Loading jika data masih dimuat
      ) : (
        <Routes>
          {/* Rute untuk Halaman Home (Daftar Buku) */}
          <Route
            path="/"
            element={
              <div>
                {isSearching ? (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Hasil Pencarian</h2>
                    <BookList
                      books={books}
                      addToFavorites={addToFavorites}  // Memasukkan fungsi addToFavorites ke dalam BookList
                    />
                  </div>
                ) : (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Rekomendasi Buku</h2>
                    <BookList
                      books={recommendedBooks}
                      addToFavorites={addToFavorites}  // Memasukkan fungsi addToFavorites ke dalam BookList
                    />
                  </div>
                )}
              </div>
            }
          />

          {/* Rute untuk Halaman FavoriteBooks */}
          <Route path="/favorites" element={<FavoriteBooks />} />

          {/* Rute untuk Halaman Detail Buku */}
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      )}
    </div>
  );
}
