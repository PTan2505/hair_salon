import React, { useContext, useState } from "react";
import { Table, Button, Modal, Dropdown, Spinner, Form } from "react-bootstrap";
import "./Appointment.css"; // Import your CSS file
import { AppointmentContext } from "../context/AppointmentContext";
import { useParams } from "react-router-dom";
import { PiSmileySad } from "react-icons/pi";
import { AppointmentStatus } from "../shared/status";
import { ModalTypeList } from "../shared/constant";
import { ModalContext } from "../context/ModalContext";

const Appointment = () => {
  const { endpoint } = useParams();
  const { appointments, loading } = useContext(AppointmentContext);
  const { setShowModal, setObject, setModalType } = useContext(ModalContext);
  const [sortOption, changeSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const status = AppointmentStatus;
  const ModalType = ModalTypeList;

  const handleShowModal = (request) => {
    setObject(request);
    setModalType(ModalType.appointmentDetail);
    setShowModal(true);
  };

  const splitDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const splitTime = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString();
  };

  const appointmentFilterList = appointments.filter((appo) => {
    return endpoint === status.waiting
      ? appo.status === false
      : endpoint === status.accepted
      ? appo.status === status.accepted
      : appo;
  });

  const filteredAppointment = appointmentFilterList.filter(
    (appintment) =>
      appintment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appintment.stylist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAppointments = [...filteredAppointment].sort((a, b) => {
    switch (sortOption) {
      case "date-asc":
        return a.date - b.date;
      case "date-desc":
        return b.date - a.date;
      case "name-asc":
        return a.customer.localeCompare(b.customer);
      case "name-desc":
        return b.customer.localeCompare(a.customer);
      // case 'time-asc':
      //     return Date(`${a.date} ${a.time}`) - Date(`${b.date} ${b.time}`);
      // case 'time-desc':
      //     return Date(`${b.date} ${b.time}`) - Date(`${a.date} ${a.time}`);
      case "stylist-asc":
        return a.stylist.localeCompare(b.stylist);
      case "stylist-desc":
        return b.stylist.localeCompare(a.stylist);
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-3">
          {endpoint === status.waiting
            ? "Appointment Request"
            : endpoint === status.accepted
            ? "Appointment"
            : "All History"}
        </h2>
      </div>
      <div
        className="d-flex align-items-center my-4"
        style={{ placeContent: "end" }}
      >
        <div style={{ width: "100%" }}>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search by name/phone"
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
            {sortOption === "date-asc"
              ? "Date (Oldest first)"
              : sortOption === "date-desc"
              ? "Date (Newest first)"
              : sortOption === "name-asc"
              ? "Customer (A-Z)"
              : sortOption === "name-desc"
              ? "Customer (Z-A)"
              : sortOption === "time-asc"
              ? "Time (Earliest first)"
              : sortOption === "time-desc"
              ? "Time (Latest first)"
              : sortOption === "stylist-asc"
              ? "Stylist (A-Z)"
              : sortOption === "stylist-desc"
              ? "Stylist (Z-A)"
              : "Sort By"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "date-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("date-asc")}
            >
              Date (Oldest first)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "date-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("date-desc")}
            >
              Date (Newest first)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "name-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("name-asc")}
            >
              Customer (A-Z)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "name-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("name-desc")}
            >
              Customer (Z-A)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "time-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("time-asc")}
            >
              Time (Earliest first)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "time-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("time-desc")}
            >
              Time (Latest first)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "stylist-asc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("stylist-asc")}
            >
              Stylist (A-Z)
            </Dropdown.Item>
            <Dropdown.Item
              className={`custom-dropdown-item ${
                sortOption === "stylist-desc" ? "custom-active" : ""
              }`}
              onClick={() => changeSortOption("stylist-desc")}
            >
              Stylist (Z-A)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {sortedAppointments.length > 0 ? (
        <Table striped borderless hover>
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Customer</th>
              <th style={{ width: "15%" }}>Stylist</th>
              <th style={{ width: "10%" }}>Date</th>
              <th style={{ width: "10%" }}>Time</th>
              <th style={{ width: "30%" }}>Note</th>
              <th style={{ width: "7%" }}>Status</th>
              <th style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.map((request) => (
              <tr key={request.id}>
                <td style={{ alignContent: "center", height: "100px" }}>
                  {request.customer}
                </td>
                <td style={{ alignContent: "center", height: "100px" }}>
                  {request.stylist}
                </td>
                <td style={{ alignContent: "center", height: "100px" }}>
                  {splitDate(request.date)}
                </td>
                <td style={{ alignContent: "center", height: "100px" }}>
                  {splitTime(request.date)}
                </td>
                <td
                  style={{
                    alignContent: "center",
                    height: "100px",
                    padding: "0 30px",
                  }}
                >
                  {request.note}
                </td>
                <td style={{ alignContent: "center", height: "100px" }}>
                  {request.status === false ? (
                    <div
                      style={{
                        backgroundColor: "darkgrey",
                        color: "white",
                        borderRadius: "1rem",
                      }}
                    >
                      Waiting...
                    </div>
                  ) : request.status === status.accepted ? (
                    <div
                      style={{
                        backgroundColor: "#ffc107",
                        color: "black",
                        borderRadius: "1rem",
                      }}
                    >
                      Accepted
                    </div>
                  ) : request.status === status.canceled ? (
                    <div
                      style={{
                        backgroundColor: "#cf2626",
                        color: "white",
                        borderRadius: "1rem",
                      }}
                    >
                      Canceled
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "1rem",
                      }}
                    >
                      Done
                    </div>
                  )}
                </td>
                <td style={{ alignContent: "center", height: "100px" }}>
                  <Button
                    style={{
                      backgroundColor: "#DEC7A6",
                      color: "black",
                      borderColor: "#DEC7A6",
                      borderRadius: "2rem",
                    }}
                    onClick={() => handleShowModal(request)}
                  >
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
};

export default Appointment;
