import React, { useContext, useState } from "react";
import { Table, Button, Modal, Dropdown, Spinner, Form } from "react-bootstrap";
import "./Appointment.css";
import { AppointmentContext } from "../context/AppointmentContext";
import { useParams } from "react-router-dom";
import { PiSmileySad } from "react-icons/pi";
import { AppointmentStatus } from "../shared/status";
import { splitDate, splitTime } from "../shared/splitDateTime";
import { sortData } from "../shared/sortData";
import SortDropdown from "../shared/SortDropdown";
import AppointmentDetail from "./AppointmentDetail";

const Appointment = () => {
  const { endpoint } = useParams();
  const { appointments, loading } = useContext(AppointmentContext);
  const [showModal, setShowModal] = useState(false);
  const [sortOption, changeSortOption] = useState("no-desc");
  const [searchQuery, setSearchQuery] = useState("");

  const status = AppointmentStatus;

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

  const sortedAppointments = sortData(filteredAppointment, sortOption);

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
                  e.preventDefault();
                }
              }}
            />
          </Form>
        </div>
        <span style={{ fontWeight: "bold", margin: "5px", textWrap: "nowrap" }}>
          Sort By :
        </span>
        <SortDropdown
          sortOption={sortOption}
          changeSortOption={changeSortOption}
          page={"appointment"}
        />
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
            {sortedAppointments.map((appointment) => (
              <>
                <AppointmentDetail
                  object={appointment}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
                <tr key={appointment.id}>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {appointment.customer}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {appointment.stylist}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {splitDate(appointment.date)}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {splitTime(appointment.date)}
                  </td>
                  <td
                    style={{
                      alignContent: "center",
                      height: "100px",
                      padding: "0 30px",
                    }}
                  >
                    {appointment.note}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {appointment.status === false ? (
                      <div
                        style={{
                          backgroundColor: "darkgrey",
                          color: "white",
                          borderRadius: "1rem",
                        }}
                      >
                        Waiting...
                      </div>
                    ) : appointment.status === status.accepted ? (
                      <div
                        style={{
                          backgroundColor: "#ffc107",
                          color: "black",
                          borderRadius: "1rem",
                        }}
                      >
                        Accepted
                      </div>
                    ) : appointment.status === status.canceled ? (
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
                      onClick={() => setShowModal(true)}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              </>
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
