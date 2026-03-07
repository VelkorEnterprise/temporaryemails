import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function App() {
  return (
    <Router>
      <Helmet>
        <title>Temp Mail Pro</title>
      </Helmet>
      <div className="min-h-screen bg-slate-900 text-white p-4">
        <h1 className="text-4xl font-bold">Temp Mail Pro</h1>
        <p>Your disposable email service.</p>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </div>
    </Router>
  );
}
