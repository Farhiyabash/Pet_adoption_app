import React from "react";
import styles from './PetAdoption.module.css';

const AdoptionComponent = ({ adoption }) => (
  <div className={styles.card}>
    <h2>Adoption</h2>
    <p>User: {adoption.user.name}</p>
    <p>Pet: {adoption.pet.name}</p>
    <p>Date Adopted: {new Date(adoption.date_adopted).toLocaleDateString()}</p>
    <p>Reason: {adoption.adoption_reason}</p>
  </div>
);

export default AdoptionComponent;
