import React, { useState, useEffect } from 'react';
import { getAllPets } from '../services/api';


const PetsList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const petsData = await getAllPets();
      setPets(petsData);
    };

    fetchPets();
  }, []);

  return (
    <div>
      <h1>Available Pets for Adoption</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>{pet.name} (Age: {pet.age})</li>
        ))}
      </ul>
    </div>
  );
};

export default PetsList;
