// src/components/AdoptionRequestForm.js
import React, { useState, useEffect } from 'react';
import { createAdoptionRequest, updateAdoptionRequest, fetchAdoptionRequest } from '../services/adoptionRequestService';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';

const AdoptionRequestForm = ({ isEditMode }) => {
    const [requestData, setRequestData] = useState({
        petId: '',
        userId: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && id) {
            const loadRequest = async () => {
                setLoading(true);
                try {
                    const request = await fetchAdoptionRequest(id);
                    setRequestData(request);
                } catch (error) {
                    setError('Failed to load adoption request');
                } finally {
                    setLoading(false);
                }
            };
            loadRequest();
        }
    }, [isEditMode, id]);

    const handleChange = (e) => {
        setRequestData({ ...requestData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (isEditMode) {
                await updateAdoptionRequest(id, requestData);
            } else {
                await createAdoptionRequest(requestData);
            }
            setSuccess(true);
            // Navigate after a short delay to allow the user to see the success message
            setTimeout(() => {
                navigate('/adoption-requests');
            }, 1500);
        } catch (error) {
            setError('Failed to submit the form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5">
            <h2 className="text-center mb-4">
                {isEditMode ? 'Edit Adoption Request' : 'Create Adoption Request'}
            </h2>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                    {isEditMode ? 'Request updated successfully!' : 'Request created successfully!'}
                </Alert>
            )}

            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg">
                <Form.Group controlId="petId">
                    <Form.Label>Pet ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="petId"
                        value={requestData.petId}
                        onChange={handleChange}
                        required
                        placeholder="Enter the Pet ID"
                        className="mb-3"
                    />
                </Form.Group>

                <Form.Group controlId="userId">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="userId"
                        value={requestData.userId}
                        onChange={handleChange}
                        required
                        placeholder="Enter your User ID"
                        className="mb-3"
                    />
                </Form.Group>

                <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="message"
                        value={requestData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Enter your message or reason for adoption"
                        className="mb-3"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {isEditMode ? 'Updating...' : 'Creating...'}
                </Button>
            </Form>
        </div>
    );
};

export default AdoptionRequestForm;