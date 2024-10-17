import React, { useContext, useState } from "react";
import { ServiceContext } from "../context/ServiceContext";
import { Button, Dropdown, Form, Spinner, Table } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import { PiSmileySad } from "react-icons/pi";
import { ModalContext } from "../context/ModalContext";
import AddService from "../shared/Modal/AddService";
import { sortData } from "../shared/sortData";
import SortDropdown from "../shared/SortDropdown";
import EditService from "../shared/Modal/EditService";

export default function Service() {
  const { services, servicesType, loading } = useContext(ServiceContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [sortOption, changeSortOption] = useState("no-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editObject, setEditObject] = useState("");

  const handleEdit = (service) => {
    setEditObject(service);
    setShowEditModal(true);
  };

  const findTypeName = (id) => {
    const serviceType = servicesType.find((type) => type.id === id);
    return serviceType ? serviceType.name : "unknown";
  };

  const filteredServices = services.filter((cust) =>
    cust.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedServices = sortData(filteredServices, sortOption);

  return (
    <div>
      <AddService showModal={showModal} setShowModal={setShowModal} />
      <EditService
        object={editObject}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-0">Service Management</h2>
        <Button
          style={{
            backgroundColor: "#DEC7A6",
            borderColor: "#DEC7A6",
            color: "black",
          }}
          onClick={() => {
            setShowModal(true);
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
        <SortDropdown
          sortOption={sortOption}
          changeSortOption={changeSortOption}
          page={"service"}
        />
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
                    {findTypeName(service.type)}
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
                    {service.is_active === true ? (
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
                        <Dropdown.Item onClick={() => handleEdit(service)}>
                          Edit
                        </Dropdown.Item>
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
