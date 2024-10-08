import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

const AppointmentRequests = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);

    // Sample data for appointment requests
    const appointmentRequests = [
        { id: 1, customer: 'John Doe', date: '2024-10-10', time: '14:00' },
        { id: 2, customer: 'Jane Smith', date: '2024-10-11', time: '15:00' },
    ];

    const handleAccept = (id) => {
        // Logic to accept the appointment
        console.log(`Accepted appointment: ${id}`);
        setShowModal(false);
    };

    const handleReject = (id) => {
        // Logic to reject the appointment
        console.log(`Rejected appointment: ${id}`);
        setShowModal(false);
    };

    const handleShowModal = (request) => {
        setCurrentRequest(request);
        setShowModal(true);
    };

    return (
        <div className="container mt-4">
            <h2>Appointment Requests</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointmentRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.customer}</td>
                            <td>{request.date}</td>
                            <td>{request.time}</td>
                            <td>
                                <Button variant="success" onClick={() => handleShowModal(request)}>
                                    Review
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Review Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentRequest && (
                        <>
                            <p><strong>Customer:</strong> {currentRequest.customer}</p>
                            <p><strong>Date:</strong> {currentRequest.date}</p>
                            <p><strong>Time:</strong> {currentRequest.time}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => handleAccept(currentRequest.id)}>
                        Accept
                    </Button>
                    <Button variant="danger" onClick={() => handleReject(currentRequest.id)}>
                        Reject
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AppointmentRequests;
