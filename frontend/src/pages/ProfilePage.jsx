import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/userService';
import HomeNavbar from '../components/PetAdoptionNavbar';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <HomeNavbar /> {/* Display the navigation bar */}
            <div className="container mt-5">
                <h1>Welcome, {profile.name}!</h1>
                <p>Email: {profile.email}</p>
                <p>Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
