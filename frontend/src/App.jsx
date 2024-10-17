import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PetList from './pages/PetList';
import Reviews from './pages/Reviews';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pets" element={<PetList />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
      <footer className="bg-dark text-white p-3 mt-5">
        <div className="container">
          <p>&copy; 2024 Pet Adoption. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
};

export default App;
