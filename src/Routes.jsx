// src/Routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetail from "./components/BookDetail";
import FavoriteBooks from "./components/FavoriteBooks";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/favorites" element={<FavoriteBooks />} />
    <Route path="/book/:id" element={<BookDetail />} />
  </Routes>
);

export default AppRoutes;
