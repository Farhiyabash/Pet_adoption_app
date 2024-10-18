import React, { useEffect, useState } from 'react';
import './PetList.css'; // Import CSS for styling
import Modal from 'react-modal'; // Ensure you have react-modal installed

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adoptedPetId, setAdoptedPetId] = useState(null);

  useEffect(() => {
    // Fetch initial pet data
    fetch('http://localhost:5000/pets')
      .then(response => response.json())
      .then(data => {
        // Add an imageUrl property to each pet
        const petsWithImages = data.map(pet => ({
          ...pet,
          imageUrl: pet.imageUrl || '', // Initialize with empty or existing URL
        }));
        setPets(petsWithImages);
      })
      .catch(error => console.error('Fetch error:', error));

    // Fetch pet types
    fetch('http://localhost:5000/pet-types')
      .then(response => response.json())
      .then(data => setPetTypes(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    fetch(`http://localhost:5000/breeds?petType=${e.target.value}`)
      .then(response => response.json())
      .then(data => setBreeds(data))
      .catch(error => console.error('Fetch error:', error));
  };

  const handleAdoptClick = (petId) => {
    setAdoptedPetId(petId);
    setIsModalOpen(true);
  };

  const handleAdopt = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ petId: adoptedPetId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Adoption failed');
        }
        return response.json();
      })
      .then(() => {
        setPets(pets.map(pet => 
          pet.id === adoptedPetId ? { ...pet, adopted: true } : pet
        ));
        setIsModalOpen(false);
        setSelectedType('');
        setSelectedBreed('');
        setDescription('');
        setAdoptedPetId(null);
        alert('Submission request has been made successfully!');
      })
      .catch(error => {
        console.error('Fetch error:', error);
        alert('There was an error processing your request.');
      });
  };

  const updateImageUrl = (id, url) => {
    setPets(pets.map(pet => 
      pet.id === id ? { ...pet, imageUrl: url } : pet
    ));
  };

  return (
    <div className="container">
      <h1>Available Pets</h1>

      <button className="btn btn-primary mb-4" onClick={() => setIsModalOpen(true)}>
        Click to Adopt Me
      </button>

      <div className="pet-cards mt-4">
        {pets.map(pet => (
          <div key={pet.id} className={`card pet-card ${pet.adopted ? 'adopted' : ''}`}>
            <img src={pet.imageUrl || 'https://i.pinimg.com/564x/99/67/4b/99674bab812772ffa95215988175d776.jpg'} alt={pet.name} className="pet-image" />
            <div className="card-body">
              <h5 className="card-title">{pet.name}</h5>
              <input 
                type="text" 
                placeholder="Update Image URL" 
                onChange={(e) => updateImageUrl(pet.id, e.target.value)} 
                className="form-control" 
              />
              <p className="card-text">{pet.description}</p>
              <button 
                className="btn btn-success" 
                onClick={() => handleAdoptClick(pet.id)} 
                disabled={pet.adopted}
              >
                {pet.adopted ? 'Adopted' : 'Adopt'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} ariaHideApp={false}>
        <h2>Adoption Request</h2>
        <form onSubmit={handleAdopt}>
          <div className="form-group">
            <label htmlFor="petType">Select Pet Type:</label>
            <select id="petType" className="form-control" value={selectedType} onChange={handleTypeChange}>
              <option value="">-- Choose a Type --</option>
              {petTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="breed">Select Breed:</label>
            <select id="breed" className="form-control" value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)} disabled={!selectedType}>
              <option value="">-- Choose a Breed --</option>
              {breeds.map(breed => (
                <option key={breed.id} value={breed.id}>{breed.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Additional Details:</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit Request</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default PetList;
