import React from "react";
import styles from './PetAdoption.module.css';

const ShelterComponent = ({ shelter }) => (
  <div className={styles.card}>
    <h2>{shelter.name}</h2>
    <p>Location: {shelter.location}</p>
    <h3>Pets in this shelter:</h3>
    <ul>
      {shelter.pets.map(pet => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </ul>
  </div>
);

export default ShelterComponent;