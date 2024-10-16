import React from "react";
import styles from './PetAdoption.module.css';

const PetComponent = ({ pet }) => (
    <div className={styles.card}>
      <h2>{pet.name}</h2>
      <p>Age: {pet.age}</p>
      <p>Description: {pet.description}</p>
      <p>Breed: {pet.breed.name}</p>
      <p>Shelter: {pet.shelter.name}</p>
      <p>Owner: {pet.owner.name}</p>
    </div>
  );
  
  export default PetComponent; 