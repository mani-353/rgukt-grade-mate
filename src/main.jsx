import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cgpa from './cgpa';
import Welcome from './welcome';
import Feedback from './feedback.jsx';
import NotFound from './Notfound.jsx'; // Ensure the correct filename and path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Home route with exact match */}
        <Route path="/" element={<Welcome />} exact={true} /> {/* Ensures exact match for "/" */}

        {/* Route for "/sgpa" and any subpaths */}
        <Route path="/sgpa/*" element={<App />} /> {/* Maintains wildcard matching */}

        {/* Route for "/cgpa" and any subpaths */}
        <Route path="/cgpa/*" element={<Cgpa />} /> {/* Maintains wildcard matching */}

        {/* "help" route with exact match */}
        <Route path="/help" element={<Feedback />} exact={true} /> {/* Ensures exact match for "/help" */}

        {/* Catch-all route for undefined URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
