import React, { useState } from "react";

export default function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan error

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); // Panggil fungsi onSearch yang diberikan dari parent (App)
      setErrorMessage(""); // Reset pesan error jika pencarian berhasil
    } else {
      setErrorMessage("Harap masukkan kata kunci untuk mencari buku."); // Menampilkan pesan error
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Cari buku..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery saat input berubah
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cari
        </button>
      </div>

      {/* Tampilkan pesan error jika searchQuery kosong */}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
