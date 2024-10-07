// UserList.jsx
import React, { useContext, useEffect } from 'react';
import { CustomerContext } from './CustomerContext';
import { Table, Form, Button, Spinner, Dropdown } from 'react-bootstrap';

const CustomerManagement = () => {
    const { customer, setCustomer } = useContext(CustomerContext);

    useEffect(() => {
        setCustomer({ id: 1, name: 'John Doe', email: 'john@example.com' });
    }, [setCustomer]);

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
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">ID</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Name (a-z)</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Name (z-a)</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {customer ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                        </tr>
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
