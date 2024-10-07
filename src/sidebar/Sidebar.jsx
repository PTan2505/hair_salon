import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css'; // Optional CSS for styling
import { Link } from 'react-router-dom';


function Sidebar({ role }) {
    return (
        <div className="sidebar">
            <Nav className="flex-column custom-nav" defaultActiveKey={'/'}>
                {role === 'admin' && (
                    <>
                        <Nav.Link as={Link} to={'/'} eventKey={'/'} className="custom-navlink">Home</Nav.Link>
                        <Nav.Link as={Link} to={'/customerManagement'} eventKey={'link-2'} className="custom-navlink">Client</Nav.Link>
                        <Nav.Link as={Link} to={'/home'} eventKey={'link-3'} className="custom-navlink">Service</Nav.Link>
                        <Nav.Link as={Link} to={'/home'} eventKey={'link-4'} className="custom-navlink">Appointment</Nav.Link>
                        <Nav.Link as={Link} to={'/home'} eventKey={'link-5'} className="custom-navlink">Staff</Nav.Link>
                        <Nav.Link as={Link} to={'/home'} eventKey={'link-6'} className="custom-navlink">Finance</Nav.Link>
                    </>
                )}
                {role === 'staff' && (
                    <>
                        <Nav.Link href="#pricing" className="custom-navlink">Booking Request</Nav.Link>
                        <Nav.Link href="#about" className="custom-navlink">About</Nav.Link>
                    </>
                )}
            </Nav>
        </div>

    );
}

export default Sidebar;
