import React, { useContext, useState, useEffect } from 'react';
import { Table, Button, Modal, Dropdown } from 'react-bootstrap';
import { SortContext } from '../context/SortContext';
import './Appointment.css'; // Import your CSS file
import { AppointmentContext } from '../context/AppointmentContext';
import { useParams } from 'react-router-dom';

const Appointment = () => {
    const { filter } = useParams();
    const { appointments, handleStatusUpdate } = useContext(AppointmentContext);
    const [showModal, setShowModal] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);
    const { sortOption, changeSortOption } = useContext(SortContext);



    const handleShowModal = (request) => {
        setCurrentRequest(request);
        setShowModal(true);
    };

    const appointmentList = appointments.filter((appo) => {

        return filter === 'request' ? appo.status === false : filter === 'view' ? appo.status === 'accepted' : appo;
    })

    const sortedAppointments = [...appointmentList].sort((a, b) => {
        switch (sortOption) {
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'name-asc':
                return a.customer.localeCompare(b.customer);
            case 'name-desc':
                return b.customer.localeCompare(a.customer);
            case 'time-asc':
                return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
            case 'time-desc':
                return new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`);
            case 'stylist-asc':
                return a.stylist.localeCompare(b.stylist);
            case 'stylist-desc':
                return b.stylist.localeCompare(a.stylist);
            default:
                return 0;
        }
    });

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className="mb-3">Appointment Request</h2>
            </div>
            <div className="d-flex align-items-center my-4" style={{ placeContent: 'end' }}>
                <span style={{ fontWeight: 'bold', margin: '5px' }}>Sort By :</span>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" style={{ width: '170px' }}>
                        {sortOption === 'date-asc' ? 'Date (Oldest first)' :
                            sortOption === 'date-desc' ? 'Date (Newest first)' :
                                sortOption === 'name-asc' ? 'Customer (A-Z)' :
                                    sortOption === 'name-desc' ? 'Customer (Z-A)' :
                                        sortOption === 'time-asc' ? 'Time (Earliest first)' :
                                            sortOption === 'time-desc' ? 'Time (Latest first)' :
                                                sortOption === 'stylist-asc' ? 'Stylist (A-Z)' :
                                                    sortOption === 'stylist-desc' ? 'Stylist (Z-A)' : 'Sort By'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            className={`custom-dropdown-item ${sortOption === 'date-asc' ? 'custom-active' : ''}`}
                            onClick={() => changeSortOption('date-asc')}
                        >
                            Date (Oldest first)
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`custom-dropdown-item ${sortOption === 'date-desc' ? 'custom-active' : ''}`}
                            onClick={() => changeSortOption('date-desc')}
                        >
                            Date (Newest first)
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`custom-dropdown-item ${sortOption === 'name-asc' ? 'custom-active' : ''}`}
                            onClick={() => changeSortOption('name-asc')}
                        >
                            Customer (A-Z)
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`custom-dropdown-item ${sortOption === 'name-desc' ? 'custom-active' : ''}`}
                            onClick={() => changeSortOption('name-desc')}
                        >
                            Customer (Z-A)
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`custom-dropdown-item ${sortOption === 'time-asc' ? 'custom-active' : ''}`}
                            onClick={() => changeSortOption('time-asc')}
                        >
                            Time (Earliest first)
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`custom-dropdown-item ${sortOption === 'time-desc' ? 'custom-active' : ''}`}
                            onClick={() => changeSortOption('time-desc')}
                        >
                            Time (Latest first)
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`custom-dropdown-item ${sortOption === 'stylist-asc' ? 'custom-active' : ''}`}
                            onClick={() => changeSortOption('stylist-asc')}
                        >
                            Stylist (A-Z)
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`custom-dropdown-item ${sortOption === 'stylist-desc' ? 'custom-active' : ''}`}
                            onClick={() => changeSortOption('stylist-desc')}
                        >
                            Stylist (Z-A)
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Stylist</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAppointments.map((request) => (
                        <tr key={request.id}>
                            <td>{request.customer}</td>
                            <td>{request.stylist}</td>
                            <td>{request.date}</td>
                            <td>{request.status}</td>
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
                            <p><strong>Customer:</strong> {currentRequest.name}</p>
                            <p><strong>Stylist:</strong> {currentRequest.stylist}</p>
                            <p><strong>Date:</strong> {currentRequest.date}</p>
                            <p><strong>Time:</strong> {currentRequest.time}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    {currentRequest && currentRequest.status === false ?
                        <Button variant="success" onClick={() => {
                            handleStatusUpdate(currentRequest.id, 'accepted')
                            setShowModal(false)
                        }}>
                            Accept
                        </Button>
                        : <Button variant="success" onClick={() => {
                            handleStatusUpdate(currentRequest.id, 'done')
                            setShowModal(false)
                        }}>
                            Done
                        </Button>
                    }
                    <Button variant="danger" onClick={() => {
                        handleStatusUpdate(currentRequest.id, 'canceled')
                        setShowModal(false)
                    }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default Appointment;
