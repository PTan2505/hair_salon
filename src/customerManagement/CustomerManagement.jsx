import React, { useContext, useEffect, useState } from 'react';
import { CustomerContext } from './CustomerContext';
import { Table, Form, Button, Spinner, Dropdown } from 'react-bootstrap';
import { customerList } from '../data/Customer'; // Import the customerList data

const CustomerManagement = () => {
    const { customer, setCustomer } = useContext(CustomerContext);
    const [selectedCustomers, setSelectedCustomers] = useState([]); // State to manage individual checkbox selections

    useEffect(() => {
        // Set the customer state with the list of customers
        setCustomer(customerList);
    }, [setCustomer]);

    // Handle null or undefined customer state
    const customerArray = customer || []; // Fallback to empty array if customer is null or undefined

    // Dynamically check if all customers are selected
    const allCustomersSelected = customerArray.length > 0 && selectedCustomers.length === customerArray.length;

    const handleSelectAll = () => {
        if (allCustomersSelected) {
            setSelectedCustomers([]); // Deselect all
        } else {
            setSelectedCustomers(customerArray.map(cust => cust.id)); // Select all customer IDs
        }
    };

    const handleSelectCustomer = (id) => {
        if (selectedCustomers.includes(id)) {
            setSelectedCustomers(selectedCustomers.filter(custId => custId !== id)); // Deselect the customer
        } else {
            setSelectedCustomers([...selectedCustomers, id]); // Select the customer
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className="mb-0">Staff Management</h2>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </div>

            <div className="d-flex align-items-center my-4" style={{ placeContent: 'end' }}>
                <span style={{ fontWeight: 'bold', margin: '5px' }}>Sort By :</span>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                        Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">ID</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Name (a-z)</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Name (z-a)</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {customerArray.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>
                                <Form.Check
                                    type="checkbox"
                                    checked={allCustomersSelected} // Automatically checked if all are selected
                                    onChange={handleSelectAll} // Toggle all selections
                                />
                            </th>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerArray.map((cust) => (
                            <tr key={cust.id}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedCustomers.includes(cust.id)} // Check if the customer is selected
                                        onChange={() => handleSelectCustomer(cust.id)} // Handle individual selection
                                    />
                                </td>
                                <td>{cust.id}</td>
                                <td>{cust.name}</td>
                                <td>{cust.email}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                            Actions
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEdit(cust.id)}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDelete(cust.id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </div>
    );
};

export default CustomerManagement;
