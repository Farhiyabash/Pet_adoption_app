import React from "react";
import styles from './PetAdoption.module.css';

const AppointmentComponent = ({ appointment }) => (
    <div className={styles.card}>
      <h2>Appointment</h2>
      <p>User: {appointment.user.name}</p>
      <p>Pet: {appointment.pet.name}</p>
      <p>Date: {new Date(appointment.appointment_date).toLocaleString()}</p>
      <p>Reason: {appointment.reason}</p>
    </div>
  );

  export default AppointmentComponent;