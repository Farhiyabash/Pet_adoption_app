import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const styles = {
    container: {
      backgroundColor: "white",
      width: "90%",
      maxWidth: "400px",
      margin: "50px auto",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.3s",
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      color: "darkcyan",
      textTransform: "uppercase",
      fontSize: "1.5em",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginTop: "15px",
      fontWeight: "bold",
      color: "#333",
    },
    input: {
      marginTop: "5px",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      transition: "border 0.3s",
      fontSize: "1em",
    },
    button: {
      marginTop: "15px",
      backgroundColor: "darkcyan",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "1em",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    link: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "0.9em",
    },
    error: {
      color: "red",
      fontSize: "0.8em",
    },
    generalError: {
      color: "red",
      fontSize: "1em",
      textAlign: "center",
      marginTop: "10px",
    },
  };

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      // Handle login logic here (e.g., API call)
      console.log(values);
      // Redirect to homepage after successful login
      navigate('/'); // Change '/' to your homepage path
    },
  });

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Login</h3>
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <label htmlFor="phone" style={styles.label}>Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="off"
          placeholder="Enter your Phone Number"
          style={styles.input}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onFocus={(e) => e.target.style.border = "1px solid darkcyan"}
          onBlur={(e) => e.target.style.border = "1px solid #ccc"}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div style={styles.error}>{formik.errors.phone}</div>
        ) : null}

        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          placeholder="Enter your Password"
          style={styles.input}
          value={formik.values.password}
          onChange={formik.handleChange}
          onFocus={(e) => e.target.style.border = "1px solid darkcyan"}
          onBlur={(e) => e.target.style.border = "1px solid #ccc"}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={styles.error}>{formik.errors.password}</div>
        ) : null}

        {/* Display general error message if form is submitted without filling in required fields */}
        {!(formik.isValid && formik.dirty) && (
          <div style={styles.generalError}>Please fill in all required fields.</div>
        )}

        <button type="submit" style={styles.button} disabled={!(formik.isValid && formik.dirty)}>
          Login
        </button>
      </form>
      <div style={styles.link}>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;