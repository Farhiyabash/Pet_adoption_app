// src/components/AdoptionRequestsList.js
import React, { useEffect, useState } from 'react';
import { fetchAdoptionRequests, deleteAdoptionRequest } from '../services/adoptionRequestService';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdoptionRequestsList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const loadRequests = async () => {
            try {
                const data = await fetchAdoptionRequests();
                setRequests(data);
            } catch (error) {
                setError('Failed to load adoption requests.');
            } finally {
                setLoading(false);
            }
        };
        loadRequests();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            try {
                await deleteAdoptionRequest(id);
                setRequests(requests.filter((request) => request.id !== id));
                setSuccess('Adoption request deleted successfully.');
            } catch (error) {
                setError('Failed to delete the request. Please try again.');
            }
        }
    };

    return (
        <div className="mt-5">
            <Link to="/adoption-requests/new">
                <Button variant="primary" className="mb-3">Create New Request</Button>
            </Link>
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
                <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
                    {success}
                </Alert>
            )}
            {!loading && !error && !success && requests.length === 0 && (
                <Alert variant="info">
                    No adoption requests found.
                </Alert>
            )}
            {!loading && requests.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pet ID</th>
                            <th>User ID</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id} className="hover-effect">
                                <td>{request.id}</td>
                                <td>{request.petId}</td>
                                <td>{request.userId}</td>
                                <td>{request.message}</td>
                                <td>
                                    <Link to={`/adoption-requests/edit/${request.id}`}>
                                        <Button variant="warning" className="me-2">Edit</Button>
                                    </Link>
                                    <Button variant="danger" onClick={() => handleDelete(request.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default AdoptionRequestsList;