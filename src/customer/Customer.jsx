import React, { useContext, useState } from "react";
import { CustomerContext } from "../context/CustomerContext";
import { Table, Form, Button, Spinner, Dropdown, Modal } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import { PiSmileySad } from "react-icons/pi";

const Customer = () => {
  const { customers, handleDeleteCustomer, loading } =
    useContext(CustomerContext);
  const [sortOption, changeSortOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const allCustomersSelected =
    customers.length > 0 && selectedCustomers.length === customers.length;

  const handleSelectAll = () => {
    if (allCustomersSelected) {
      setSelectedCustomers([]); // Deselect all
    } else {
      setSelectedCustomers(customers.map((cust) => cust.id)); // Select all customer IDs
    }
  };

  const handleSelectCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter((custId) => custId !== id)); // Deselect the customer
    } else {
      setSelectedCustomers([...selectedCustomers, id]); // Select the customer
    }
  };

  const handleShowModal = (request) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    handleDeleteCustomer(id);
    setShowModal(false);
  };

  const filteredCustomers = customers.filter(
    (cust) =>
      cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortOption) {
      case "no-asc":
        return a.id - b.id;
      case "no-desc":
        return b.id - a.id;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "email-asc":
        return a.email.localeCompare(b.email);
      case "email-desc":
        return b.email.localeCompare(a.email);
      case "phone-asc":
        return a.phone.localeCompare(b.phone);
      case "phone-desc":
        return b.phone.localeCompare(a.phone);
      case "active-asc":
        return Number(b.is_active) - Number(a.is_active);
      case "active-desc":
        return Number(a.is_active) - Number(b.is_active);
      case "point-asc":
        return a.point - b.point;
      case "point-desc":
        return b.point - a.point;

      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-0">Customer Management</h2>
      </div>
      <div
        className="d-flex align-items-center my-4"
        style={{ placeContent: "end" }}
      >
        <div style={{ width: "100%" }}>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search customer by name/phone"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent the form submission
                }
              }}
            />
          </Form>
        </div>
        <span style={{ fontWeight: "bold", margin: "5px", textWrap: "nowrap" }}>
          Sort By :
        </span>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-dark"
            id="dropdown-basic"
            style={{ width: "170px" }}
          >
            {sortOption === "no-asc"
              ? "No (Ascending)"
              : sortOption === "no-desc"
              ? "No (Descending)"
              : sortOption === "name-asc"
              ? "Name (A-Z)"
              : sortOption === "name-desc"
              ? "Name (Z-A)"
              : sortOption === "email-asc"
              ? "Email (A-Z)"
              : sortOption === "email-desc"
              ? "Email (Z-A)"
              : sortOption === "phone-asc"
              ? "Phone (A-Z)"
              : sortOption === "phone-desc"
              ? "Phone (Z-A)"
              : sortOption === "active-asc"
              ? "Active (Yes first)"
              : sortOption === "active-desc"
              ? "Active (No first)"
              : sortOption === "point-asc"
              ? "Point (Low to High)"
              : sortOption === "point-desc"
              ? "Point (High to Low)"
              : "Sort By"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "no-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("no-asc")}
            >
              No (Ascending)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "no-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("no-desc")}
            >
              No (Descending)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "name-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("name-asc")}
            >
              Name (A-Z)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "name-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("name-desc")}
            >
              Name (Z-A)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "email-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("email-asc")}
            >
              Email (A-Z)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "email-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("email-desc")}
            >
              Email (Z-A)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "phone-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("phone-asc")}
            >
              Phone (A-Z)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "phone-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("phone-desc")}
            >
              Phone (Z-A)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "active-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("active-asc")}
            >
              Active (Yes first)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "active-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("active-desc")}
            >
              Active (No first)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "point-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("point-asc")}
            >
              Point (Low to High)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "point-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("point-desc")}
            >
              Point (High to Low)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {sortedCustomers.length > 0 ? (
        <>
          <Table striped borderless hover>
            <thead>
              <tr>
                <th style={{ width: "50px" }}>
                  <Form.Check
                    type="checkbox"
                    checked={allCustomersSelected} // Automatically checked if all are selected
                    onChange={handleSelectAll} // Toggle all selections
                  />
                </th>
                <th style={{ width: "50px" }}>No</th>
                <th style={{ width: "20%" }}>Name</th>
                <th style={{ width: "20%" }}>Email</th>
                <th style={{ width: "20%" }}>Phone</th>
                <th style={{ width: "100px" }}>Active</th>
                <th style={{ width: "10%" }}>Point</th>
                <th style={{ width: "50px" }}></th>
              </tr>
            </thead>
            <tbody>
              {sortedCustomers.map((cust) => (
                <tr key={cust.id}>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    <Form.Check
                      type="checkbox"
                      checked={selectedCustomers.includes(cust.id)} // Check if the customer is selected
                      onChange={() => handleSelectCustomer(cust.id)} // Handle individual selection
                    />
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {cust.id}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {cust.name}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {cust.email}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {cust.phone}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {cust.is_active === true ? (
                      <div
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: "1rem",
                          margin: "30px",
                        }}
                      >
                        Active
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#cf2626",
                          color: "white",
                          borderRadius: "1rem",
                          margin: "30px",
                        }}
                      >
                        No Active
                      </div>
                    )}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {cust.point}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id="dropdown-custom-components"
                        bsPrefix="icon-dropdown-toggle" // Custom class to remove arrow styling
                        style={{ border: "none" }}
                      >
                        <SlOptionsVertical
                          size={20}
                          style={{ color: "black" }}
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleShowModal(cust)}>
                          View Information
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelete(cust.id)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : loading ? (
        <div style={{ marginTop: "200px" }}>
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <div style={{ marginTop: "200px" }}>
          <PiSmileySad size={"100px"} />
          <h2>Empty Data</h2>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Customer's Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRequest && (
            <>
              <p>
                <strong>Name</strong> {currentRequest.name}
              </p>
              <p>
                <strong>Sex:</strong> {currentRequest.sex}
              </p>
              <p>
                <strong>Birth Date:</strong> {currentRequest.birth_date}
              </p>
              <p>
                <strong>Email:</strong> {currentRequest.email}
              </p>
              <p>
                <strong>Phone:</strong> {currentRequest.phone}
              </p>
              <p>
                <strong>Point:</strong> {currentRequest.point}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {currentRequest.is_active ? (
                  <span
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "2px 30px",
                      borderRadius: "1rem",
                    }}
                  >
                    Active
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: "#cf2626",
                      color: "white",
                      padding: "2px 20px",
                      borderRadius: "1rem",
                    }}
                  >
                    No Active
                  </span>
                )}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customer;
