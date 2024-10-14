import React, { useState } from "react";
import { Nav, Dropdown, NavbarText } from "react-bootstrap";
import "./Sidebar.css"; // Optional CSS for styling
import { Link, useLocation } from "react-router-dom";

function Sidebar({ role }) {
  const location = useLocation(); // Get current location

  return (
    <div className="sidebar">
      <Nav className="flex-column custom-nav" activeKey={location.pathname}>
        {role === "admin" && (
          <>
            <h5
              style={{
                color: "#DEC7A6",
                padding: "10px",
                borderBottom: "double",
                borderTop: "double",
                margin: "20px",
              }}
            >
              Appointment
            </h5>
            <Nav.Link
              as={Link}
              to={"/appointment/waiting"}
              eventKey={"/appointment/waiting"}
              className="custom-navlink"
            >
              Appointment Request
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/appointment/accepted"}
              eventKey={"/appointment/accepted"}
              className="custom-navlink"
            >
              Appointment
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/appointment/all"}
              eventKey={"/appointment/all"}
              className="custom-navlink"
            >
              All Appointment
            </Nav.Link>

            <h5
              style={{
                color: "#DEC7A6",
                padding: "10px",
                borderBottom: "double",
                borderTop: "double",
                margin: "20px",
              }}
            >
              Management
            </h5>
            <Nav.Link
              as={Link}
              to={"/"}
              eventKey={"/"}
              className="custom-navlink"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/customer"}
              eventKey={"/customer"}
              className="custom-navlink"
            >
              Client
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/staff"}
              eventKey={"/staff"}
              className="custom-navlink"
            >
              Staff
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/service"}
              eventKey={"/service"}
              className="custom-navlink"
            >
              Service
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/home"}
              eventKey={"link-7"}
              className="custom-navlink"
            >
              Finance
            </Nav.Link>
          </>
        )}
        {role === "staff" && (
          <>
            <Nav.Link href="#pricing" className="custom-navlink">
              Booking Request
            </Nav.Link>
            <Nav.Link href="#about" className="custom-navlink">
              About
            </Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
}

export default Sidebar;
