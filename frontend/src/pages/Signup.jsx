import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      gender: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      phone: Yup.string().required('Phone number is required'),
      gender: Yup.string().required('Gender is required'),
    }),
    onSubmit: async (values) => {
      
      try {
        const res = await fetch(
          ${import.meta.env.REACT_API_URL}/users,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
           
          }
        );

        // Check if the response is okay (status code 200-299)
        if (!res.ok) {
          throw new Error(Error: ${res.statusText});
        }

        const data = await res.json();

        // Optionally check if the returned data includes expected confirmation
        if (data && data.id) {
          console.log('Data saved successfully:', data);
          // Navigate to the home page
          navigate('/');
        } else {
          console.error('Data was not saved correctly:', data);
        }
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    },
  });

  return (
    <div style={{ backgroundColor: "white", width: "30%", margin: "50px auto", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ textAlign: "center", color: "darkcyan" }}>Sign Up</h3>
      <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...formik.getFieldProps('name')}
          placeholder="Enter your name"
        />
        {formik.touched.name && formik.errors.name ? <div style={{ color: 'red' }}>{formik.errors.name}</div> : null}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...formik.getFieldProps('email')}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...formik.getFieldProps('password')}
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          {...formik.getFieldProps('phone')}
          placeholder="Enter your phone number"
        />
        {formik.touched.phone && formik.errors.phone ? <div style={{ color: 'red' }}>{formik.errors.phone}</div> : null}

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          {...formik.getFieldProps('gender')}
        >
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? <div style={{ color: 'red' }}>{formik.errors.gender}</div> : null}

        <button type="submit" style={{ marginTop: "15px", backgroundColor: "darkcyan", color: "white", border: "none", padding: "10px", cursor: "pointer", borderRadius: "5px", fontSize: "16px", fontWeight: "bold" }} disabled={!(formik.isValid && formik.dirty)}>
          Sign Up
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;