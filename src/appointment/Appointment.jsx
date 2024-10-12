import React, { useContext, useState } from "react";
import { Table, Button, Modal, Dropdown, Spinner } from "react-bootstrap";
import "./Appointment.css"; // Import your CSS file
import { AppointmentContext } from "../context/AppointmentContext";
import { useParams } from "react-router-dom";
import { PiSmileySad } from "react-icons/pi";
import { NoticficationContext } from "../context/NoticficationContext";
import { AppointmentStatus, NoticeType } from "../shared/status";

const Appointment = () => {
  const { endpoint } = useParams();
  const { appointments, handleStatusUpdate, loading } =
    useContext(AppointmentContext);
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [sortOption, changeSortOption] = useState("");
  const { handleShowNotice } = useContext(NoticficationContext);

  const status = AppointmentStatus;
  const noticeType = NoticeType;

  const handleStatusChange = (id, newStatus) => {
    handleStatusUpdate(id, newStatus);
    setShowModal(false);
    newStatus === status.canceled
      ? handleShowNotice(noticeType.red, `Appointment has been ${newStatus}!!!`)
      : newStatus === status.done
      ? handleShowNotice(
          noticeType.green,
          `Appointment has been ${newStatus}!!!`
        )
      : handleShowNotice(
          noticeType.yellow,
          `Appointment has been ${newStatus}!!!`
        );
  };

  const handleShowModal = (request) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const appointmentFilterList = appointments.filter((appo) => {
    return endpoint === status.waiting
      ? appo.status === false
      : endpoint === status.accepted
      ? appo.status === status.accepted
      : appo;
  });

  const sortedAppointments = [...appointmentFilterList].sort((a, b) => {
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
      {sortedAppointments.length > 0 ? (
        <>
          <div
            className="d-flex align-items-center my-4"
            style={{ placeContent: "end" }}
          >
            <span style={{ fontWeight: "bold", margin: "5px" }}>Sort By :</span>
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
          <Table striped borderless hover>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Customer</th>
                <th style={{ width: "20%" }}>Stylist</th>
                <th style={{ width: "20%" }}>Date</th>
                <th style={{ width: "20%" }}>Time</th>
                <th style={{ width: "10%" }}>Status</th>
                <th style={{ width: "10%" }}>Actions</th>
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
                    {request.date}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {request.time}
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
          <Modal.Title>Review Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRequest && (
            <>
              <p>
                <strong>Customer:</strong> {currentRequest.customer}
              </p>
              <p>
                <strong>Stylist:</strong> {currentRequest.stylist}
              </p>
              <p>
                <strong>Date:</strong> {currentRequest.date}
              </p>
              <p>
                <strong>Time:</strong> {currentRequest.time}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {currentRequest && currentRequest?.status === false ? (
            <>
              <Button
                variant="warning"
                onClick={() => {
                  handleStatusChange(currentRequest.id, status.accepted);
                }}
              >
                Accept
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleStatusChange(currentRequest.id, status.canceled);
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            currentRequest?.status === "accepted" && (
              <>
                <Button
                  variant="success"
                  onClick={() => {
                    handleStatusChange(currentRequest.id, status.done);
                  }}
                >
                  Done
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleStatusChange(currentRequest.id, status.canceled);
                  }}
                >
                  Cancel
                </Button>
              </>
            )
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Appointment;
