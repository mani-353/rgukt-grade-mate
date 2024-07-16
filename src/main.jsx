import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cgpa from './cgpa';
import Welcome from './welcome';
import Feedback from './feedback.jsx';
import NotFound from './NotFound.jsx'; // Ensure the correct filename and path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/sgpa/*" element={<App />} />
        <Route path="/cgpa/*" element={<Cgpa />} />
        <Route path="/help" element={<Feedback />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for undefined URLs */}
      </Routes>
    </Router>
  </React.StrictMode>
);
