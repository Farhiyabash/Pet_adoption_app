import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.REACT_API_URL}/users/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing the JWT token in local storage
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();

        if (data) {
          setUser(data); // Set the user data returned from the API
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        // Redirect to login if the user is not authenticated
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: '400px', margin: 'auto' }}>
        <h3 className="text-center text-darkcyan mb-4">User Profile</h3>
        {user ? (
          <div>
            <h5>Name: {user.name}</h5>
            <h5>Email: {user.email}</h5>
            <h5>Phone: {user.phone}</h5>
            <h5>Gender: {user.gender}</h5>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
