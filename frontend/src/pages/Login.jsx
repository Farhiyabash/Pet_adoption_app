import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      name: isRegistering ? Yup.string().required('Name is required') : Yup.string().notRequired(),
    }),
    onSubmit: () => {
      setLoading(true);
      // Simulate a login API call
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem('loggedIn', 'true'); // Set login status
        navigate('/'); // Navigate to home page after "login"
      }, 1000); // Simulated delay
    },
  });

  return (
    <div style={{ backgroundColor: "white", width: "90%", maxWidth: "400px", margin: "50px auto", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ textAlign: "center", fontWeight: "bold", color: "darkcyan", textTransform: "uppercase", fontSize: "1.5em" }}>
        {isRegistering ? 'Register' : 'Login'}
      </h3>
      <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email" style={{ marginTop: "15px", fontWeight: "bold", color: "#333" }}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          placeholder="Enter your Email"
          style={{ marginTop: "5px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1em" }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onFocus={(e) => e.target.style.border = "1px solid darkcyan"}
          onBlur={(e) => e.target.style.border = "1px solid #ccc"}
        />
        {formik.touched.email && formik.errors.email && <div style={{ color: "red", fontSize: "0.8em" }}>{formik.errors.email}</div>}

        {isRegistering && (
          <>
            <label htmlFor="name" style={{ marginTop: "15px", fontWeight: "bold", color: "#333" }}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Enter your Name"
              style={{ marginTop: "5px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1em" }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onFocus={(e) => e.target.style.border = "1px solid darkcyan"}
              onBlur={(e) => e.target.style.border = "1px solid #ccc"}
            />
            {formik.touched.name && formik.errors.name && <div style={{ color: "red", fontSize: "0.8em" }}>{formik.errors.name}</div>}
          </>
        )}

        <label htmlFor="password" style={{ marginTop: "15px", fontWeight: "bold", color: "#333" }}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          placeholder="Enter your Password"
          style={{ marginTop: "5px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1em" }}
          value={formik.values.password}
          onChange={formik.handleChange}
          onFocus={(e) => e.target.style.border = "1px solid darkcyan"}
          onBlur={(e) => e.target.style.border = "1px solid #ccc"}
        />
        {formik.touched.password && formik.errors.password && <div style={{ color: "red", fontSize: "0.8em" }}>{formik.errors.password}</div>}

        {!(formik.isValid && formik.dirty) && <div style={{ color: "red", fontSize: "1em", textAlign: "center", marginTop: "10px" }}>Please fill in all required fields.</div>}

        <button type="submit" style={{ marginTop: "15px", backgroundColor: "darkcyan", color: "white", border: "none", padding: "10px", cursor: "pointer", borderRadius: "5px", fontSize: "1em", fontWeight: "bold" }} disabled={!(formik.isValid && formik.dirty) || loading}>
          {loading ? 'Loading...' : (isRegistering ? 'Register' : 'Login')}
        </button>
      </form>
      <div style={{ marginTop: "20px", textAlign: "center", fontSize: "0.9em" }}>
        <p>
          {isRegistering ? "Already have an account?" : "Don't have an account?"} 
          <span onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer', color: 'darkcyan' }}>
            {isRegistering ? ' Login' : ' Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
