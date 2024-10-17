import React, { useEffect, useState } from 'react';

const PetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://172.30.130.227:5000/pets')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPets(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="container">
      <h1>Available Pets</h1>
      <ul className="list-group">
        {pets.map(pet => (
          <li key={pet.id} className="list-group-item">
            <strong>{pet.name}</strong> - {pet.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;
