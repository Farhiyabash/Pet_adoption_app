// src/components/AdoptionRequestForm.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { createAdoptionRequest } from '../redux/adoptionRequestSlice'; // Action to create an adoption request
import { useUser } from '../hooks/useUser'; // Hook to get user info
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // For validation
import { Button, Alert } from 'react-bootstrap'; // Bootstrap components for styling

const AdoptionRequestForm = ({ petId }) => {
    const dispatch = useDispatch();
    const { user } = useUser(); // Get user information

    // Validation schema using Yup
    const validationSchema = Yup.object({
        reason: Yup.string()
            .min(10, 'Reason must be at least 10 characters long')
            .required('Reason for adoption is required'),
    });

    // Form submission handler
    const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
        try {
            // Prepare form data
            const formData = {
                userId: user.id,
                petId: petId,
                reason: values.reason,
            };

            // Dispatch the action to create an adoption request
            await dispatch(createAdoptionRequest(formData)).unwrap();
            setStatus({ success: true, message: 'Adoption request submitted successfully!' });
        } catch (err) {
            setErrors({ submit: err.message || 'Something went wrong. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="adoption-request-form">
            <h3>Adoption Request</h3>
            <Formik
                initialValues={{ reason: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="reason">Reason for Adoption</label>
                            <Field as="textarea" name="reason" className="form-control" rows={3} />
                            <ErrorMessage name="reason" component="div" className="text-danger" />
                        </div>
                        {status && status.success && <Alert variant="success">{status.message}</Alert>}
                        {status && status.error && <Alert variant="danger">{status.error}</Alert>}
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdoptionRequestForm;
