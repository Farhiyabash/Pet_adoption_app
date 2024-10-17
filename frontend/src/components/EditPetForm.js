import React, { useState, useEffect } from 'react';
import { getPetById, updatePet } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditPetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({ name: '', age: '', description: '', pet_type_id: '', owner_id: '' });

  useEffect(() => {
    const fetchPet = async () => {
      const petData = await getPetById(id);
      setPet(petData);
    };
    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePet(id, pet);
    alert('Pet updated successfully!');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={pet.name} onChange={handleChange} />

      <label>Age:</label>
      <input type="number" name="age" value={pet.age} onChange={handleChange} />

      <label>Description:</label>
      <input type="text" name="description" value={pet.description} onChange={handleChange} />

      <label>Pet Type ID:</label>
      <input type="number" name="pet_type_id" value={pet.pet_type_id} onChange={handleChange} />

      <label>Owner ID:</label>
      <input type="number" name="owner_id" value={pet.owner_id} onChange={handleChange} />

      <button type="submit">Update Pet</button>
    </form>
  );
};

export default EditPetForm;
