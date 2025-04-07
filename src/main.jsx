// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Pastikan import Router
import App from './App.jsx';  // Komponen utama aplikasi

// Membungkus aplikasi dengan Router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Pastikan aplikasi dibungkus dengan Router */}
      <App />
    </Router>
  </React.StrictMode>
);
