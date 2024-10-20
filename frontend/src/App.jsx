// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import PetsPage from './pages/PetsPage'; // Import PetsPage
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'; // Import Navbar

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Render Navbar globally, can be conditionally shown */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pets" element={<PetsPage />} /> {/* Add PetsPage route */}
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;