import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/userService';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                alert('You are not logged in. Please log in to view your profile.');
                return;
            }
            try {
                const profileData = await getUserProfile(token);
                setUser(profileData);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                alert('Failed to fetch profile. Please log in again.');
            }
        };

        fetchProfile();
    }, [token]);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default ProfilePage;
