import React from "react";
import styles from './PetAdoption.module.css';

const BreedComponent = ({ breed }) => (
  <div className={styles.card}>
    <h2>{breed.name}</h2>
    <h3>Pets of this breed:</h3>
    <ul>
      {breed.pets.map(pet => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </ul>
  </div>
);

export default BreedComponent;
