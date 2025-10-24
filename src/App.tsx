import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import CategoryPage from './pages/category/CategoryPage';
import ProductPage from './pages/product/ProductPage';
import AddProductPage from './pages/product/AddProductPage';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/add" element={<AddProductPage />} />
          <Route path="*" element={<Navigate to="/product" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
