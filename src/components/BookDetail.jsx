// src/components/BookDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetail = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await response.json();
      setBook(data);  // Set data buku
      setIsLoading(false);  // Update loading state
    };

    fetchBookDetail();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  const info = book?.volumeInfo || {};

  // Fungsi untuk menghapus tag HTML
  const removeHtmlTags = (text) => {
    return text.replace(/<[^>]*>/g, "");  // Menghapus semua tag HTML
  };

  return (
    <div className="border p-6 rounded-xl shadow-lg max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">{info?.title || "Judul tidak ditemukan"}</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={info?.imageLinks?.thumbnail || "https://via.placeholder.com/128x195?text=No+Image"}
          alt={info?.title || "Book Cover"}
          className="w-48 h-auto rounded-lg shadow-sm mx-auto md:mx-0"
        />

        <div className="flex-1">
          <p className="text-gray-700 mb-2">
            <strong>Penulis:</strong> {info?.authors?.join(", ") || "Tidak diketahui"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Penerbit:</strong> {info?.publisher || "Tidak diketahui"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Tanggal Terbit:</strong> {info?.publishedDate || "-"}
          </p>

          {/* Menampilkan deskripsi tanpa tag HTML */}
          <p className="text-gray-700 mt-4">
            {removeHtmlTags(info?.description) || "Tidak ada deskripsi."}
          </p>
        </div>
      </div>
    </div>
  );
}
