// src/components/AdoptionsPage.jsx

import React, { useState, useEffect } from 'react';
import { fetchAdoptionRequests } from '../services/adoptionRequestService';
import AdoptionRequestsList from './AdoptionRequestsList';
import AdoptionRequestForm from './AdoptionRequestForm';
import { Button, Modal } from 'react-bootstrap';

const AdoptionsPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentRequestId, setCurrentRequestId] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleEditRequest = (request) => {
        setCurrentRequestId(request.id);
        setIsEditMode(true);
        setShowForm(true);
    };

    const handleShowForm = () => {
        setIsEditMode(false);
        setCurrentRequestId(null);
        setShowForm(true);
    };

    const handleCloseForm = () => setShowForm(false);

    return (
        <div className="container mt-5">
            <h1>Adoption Requests</h1>
            <Button variant="primary" onClick={handleShowForm} className="mb-3">
                Create New Adoption Request
            </Button>
            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && requests.length === 0 && <div>No adoption requests found.</div>}
            {!loading && requests.length > 0 && (
                <AdoptionRequestsList requests={requests} onEdit={handleEditRequest} />
            )}
            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? 'Edit Adoption Request' : 'Create Adoption Request'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AdoptionRequestForm isEditMode={isEditMode} requestId={currentRequestId} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdoptionsPage;
