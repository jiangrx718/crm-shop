import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import CategoryPage from './pages/category/CategoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/category" element={<CategoryPage />} />
          <Route path="*" element={<Navigate to="/category" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
