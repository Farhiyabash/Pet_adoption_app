// UpdateProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../api'; // Adjust the import path as needed
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Alert } from 'react-bootstrap';

const UpdateProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile();
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                });
            } catch (error) {
                setError('Failed to fetch user profile. Please log in again.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await updateUserProfile(formData.name, formData.email);
            setUser({ ...user, ...formData });
            setSuccess(true);
        } catch (error) {
            setError(error.message || 'An error occurred while updating the profile.');
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <Container className="mt-5">
            <h2 className="text-center">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Profile updated successfully!</Alert>}
            {user && (
                <div className="border p-4 rounded shadow">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Update Profile
                        </Button>
                    </Form>
                </div>
            )}
        </Container>
    );
};

export default UpdateProfilePage;

