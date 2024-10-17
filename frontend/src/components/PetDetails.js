import React, { useState, useEffect } from 'react';
import { getPetById, deletePet } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      const petData = await getPetById(id);
      setPet(petData);
    };
    fetchPet();
  }, [id]);

  const handleDelete = async () => {
    await deletePet(id);
    alert('Pet deleted successfully!');
    navigate('/');
  };

  return (
    pet && (
      <div>
        <h1>{pet.name}</h1>
        <p>Age: {pet.age}</p>
        <p>Description: {pet.description}</p>
        <p>Pet Type ID: {pet.pet_type_id}</p>
        <p>Owner ID: {pet.owner_id}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate(`/edit-pet/${id}`)}>Edit</button>
      </div>
    )
  );
};

export default PetDetails;
