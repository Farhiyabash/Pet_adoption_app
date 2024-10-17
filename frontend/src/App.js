import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetsList from './components/PetsList';
import AddPetForm from './components/AddPetForm';
import EditPetForm from './components/EditPetForm';
import PetDetails from './components/PetDetails';
import UsersList from './components/UsersList';
import Navbar from './components/Navbar';
import './App.css';  // Global CSS file

function App() {
  return (
    <div className="app">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PetsList />} />
        <Route path="/add-pet" element={<AddPetForm />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/edit-pet/:id" element={<EditPetForm />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
