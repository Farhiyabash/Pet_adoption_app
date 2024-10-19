import React, { useEffect, useState } from 'react';
import {
    getAdoptionRequests,
    createAdoptionRequest,
    deleteAdoptionRequest
} from '../api'; // Adjust the path according to your project structure
import './AdoptionsPage.css'; // Create a CSS file for styles if needed

const AdoptionsPage = () => {
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newRequest, setNewRequest] = useState({ userId: '', petId: '', message: '' });

    // Fetch adoption requests on component mount
    useEffect(() => {
        const fetchAdoptionRequests = async () => {
            try {
                const data = await getAdoptionRequests();
                setAdoptionRequests(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdoptionRequests();
    }, []);

    // Handle input changes for the new request form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRequest((prev) => ({ ...prev, [name]: value }));
    };

    // Create a new adoption request
    const handleCreateRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await createAdoptionRequest(newRequest.userId, newRequest.petId, newRequest.message);
            setAdoptionRequests((prev) => [...prev, response]);
            setNewRequest({ userId: '', petId: '', message: '' }); // Reset form
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Delete an adoption request
    const handleDeleteRequest = async (id) => {
        setLoading(true);
        try {
            await deleteAdoptionRequest(id);
            setAdoptionRequests((prev) => prev.filter((request) => request.id !== id));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Render loading, error, or the adoption requests
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="adoptions-page">
            <h1>Adoption Requests</h1>
            <form onSubmit={handleCreateRequest}>
                <input
                    type="text"
                    name="userId"
                    placeholder="User ID"
                    value={newRequest.userId}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="petId"
                    placeholder="Pet ID"
                    value={newRequest.petId}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Adoption Message"
                    value={newRequest.message}
                    onChange={handleInputChange}
                    required
                ></textarea>
                <button type="submit">Create Adoption Request</button>
            </form>
            <ul>
                {adoptionRequests.map((request) => (
                    <li key={request.id}>
                        <p>
                            <strong>User ID:</strong> {request.user_id} | <strong>Pet ID:</strong> {request.pet_id}
                        </p>
                        <p>{request.message}</p>
                        <button onClick={() => handleDeleteRequest(request.id)}>Delete Request</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdoptionsPage;
