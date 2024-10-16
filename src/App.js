import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BreedComponent from "./components/Breed";
import ShelterComponent from "./components/Shelter";
import PetComponent from "./components/Pet";
import AppointmentComponent from "./components/Appointment";
import ReviewComponent from "./components/Review";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Shelters from "./pages/Shelters";
import UserComponent from "./components/User";
import AdoptionComponent from "./components/Adoption";



const App = () => {
  // This is where you'd fetch data from your backend
  const user = { name: 'John Doe', email: 'john@example.com', pets: [{ id: 1, name: 'Buddy' }] };
  const breed = { name: 'Labrador', pets: [{ id: 1, name: 'Buddy' }] };
  const shelter = { name: 'Happy Paws', location: 'New York', pets: [{ id: 1, name: 'Buddy' }] };
  const pet = { name: 'Buddy', age: 3, description: 'Friendly dog', breed: { name: 'Labrador' }, shelter: { name: 'Happy Paws' }, owner: { name: 'John Doe' } };
  const adoption = { user: { name: 'John Doe' }, pet: { name: 'Buddy' }, date_adopted: '2023-05-20', adoption_reason: 'Love at first sight' };
  const review = { user: { name: 'John Doe' }, pet: { name: 'Buddy' }, rating: 5, comment: 'Great pet!', date_created: '2023-05-25' };
  const appointment = { user: { name: 'John Doe' }, pet: { name: 'Buddy' }, appointment_date: '2023-06-01T10:00:00', reason: 'Regular checkup' };

  return (
    <Router>
      <div>
        <h1>Pet Adoption App</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/user" element={<UserComponent user={user} />} />
          <Route path="/adoption" element={<AdoptionComponent adoption={adoption} />} />
          <Route path="/breed" element={<BreedComponent breed={breed} />} />
          <Route path="/shelter" element={<ShelterComponent shelter={shelter} />} />
          <Route path="/pet" element={<PetComponent pet={pet} />} />
          <Route path="/review" element={<ReviewComponent review={review} />} />
          <Route path="/appointment" element={<AppointmentComponent appointment={appointment} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;