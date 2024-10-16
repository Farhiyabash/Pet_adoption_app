import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.a}>Home</Link>
        </li>
        <li style={styles.li}>
          <Link to="/shelters" style={styles.a}>Shelters</Link>
        </li>
        <li style={styles.li}>
          <Link to="/user" style={styles.a}>User</Link>
        </li>
        <li style={styles.li}>
          <Link to="/adoption" style={styles.a}>Adoption</Link>
        </li>
      </ul>
    </nav>
  );
};

// Some simple inline styles for the navbar
const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '1rem',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: '0',
    padding: '0',
  },
  li: {
    display: 'inline',
  },
  a: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
  }
};

export default Navbar;
