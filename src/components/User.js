import React from 'react'
import styles from './PetAdoption.module.css';

const UserComponent = ({ user }) => (
  <div className={styles.card}>
    <h2>{user.name}</h2>
    <p>Email: {user.email}</p>
    <h3>Pets:</h3>
    <ul>
      {user.pets.map(pet => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </ul>
  </div>
);

export default UserComponent;
