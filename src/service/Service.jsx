import React, { useContext, useState } from "react";
import { ServiceContext } from "../context/ServiceContext";
import { Button, Dropdown, Form, Spinner, Table } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import { PiSmileySad } from "react-icons/pi";
import { ModalContext } from "../context/ModalContext";
import { ModalTypeList } from "../shared/constant";

export default function Service() {
  const { services, handleAddService, loading } = useContext(ServiceContext);
  const { setModalType, setShowModal } = useContext(ModalContext);
  const [sortOption, changeSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const ModalType = ModalTypeList;

  const filteredServices = services.filter((cust) =>
    cust.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedServices = [...filteredServices].sort((a, b) => {
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
        <h2 className="mb-0">Service Management</h2>
        <Button
          style={{
            backgroundColor: "#DEC7A6",
            borderColor: "#DEC7A6",
            color: "black",
          }}
          onClick={() => {
            setModalType(ModalType.addService);
            setShowModal(true);
            console.log(services);
          }}
        >
          Add Service
        </Button>
      </div>
      <div
        className="d-flex align-items-center my-4"
        style={{ placeContent: "end" }}
      >
        <div style={{ width: "100%" }}>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search by name"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
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
      {sortedServices.length > 0 ? (
        <>
          <Table striped borderless hover>
            <thead>
              <tr>
                <th style={{ width: "50px" }}>No</th>
                <th style={{ width: "20%" }}>Name</th>
                <th style={{ width: "20%" }}>Type</th>
                <th style={{ width: "20%" }}>Price</th>
                <th style={{ width: "10%" }}>Point</th>
                <th style={{ width: "10%" }}>Time</th>
                <th style={{ width: "100px" }}>Active</th>
                <th style={{ width: "50px" }}></th>
              </tr>
            </thead>
            <tbody>
              {sortedServices.map((service) => (
                <tr key={service.id}>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service.id}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service.name}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service.type}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service.price}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service.point}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service.time}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service.isActive === true ? (
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
                        <Dropdown.Item onClick={() => {}}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}>Delete</Dropdown.Item>
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
    </div>
  );
}
