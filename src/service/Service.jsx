import React, { useContext, useState } from "react";
import { ServiceContext } from "../context/ServiceContext";
import { Button, Dropdown, Form, Spinner, Table } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import { PiSmileySad } from "react-icons/pi";
import { sortData } from "../shared/sortData";
import SortDropdown from "../shared/SortDropdown";
import { toastSuccess } from "../shared/toastify";
import Confirm from "../shared/Modal/Confirm";
import AddService from "./AddService";
import EditService from "./EditService";
import { SERVICE_FIELDS, TYPE_FIELDS } from "../shared/constant";

export default function Service() {
  const { services, servicesType, loading, handleDeleteService } =
    useContext(ServiceContext);
  const [showModal, setShowModal] = useState(false);
  const [sortOption, changeSortOption] = useState("no-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [object, setObject] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = (service) => {
    setObject(service);
    setShowEditModal(true);
  };

  const handleDelete = (object) => {
    setShowConfirm(false);
    handleDeleteService(object[SERVICE_FIELDS.ID]);
    toastSuccess("Delete Service Successfully");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const findTypeName = (id) => {
    const serviceType = servicesType.find(
      (type) => type[TYPE_FIELDS.ID] === id
    );
    return serviceType ? serviceType[TYPE_FIELDS.NAME] : "unknown";
  };

  const filteredServices = services.filter((service) =>
    service[SERVICE_FIELDS.NAME]
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const sortedServices = sortData(filteredServices, sortOption);

  return (
    <div>
      <Confirm
        action={"delete"}
        showConfirm={showConfirm}
        onCancel={handleCancel}
        onConfirm={() => handleDelete(object)}
      />
      <AddService showModal={showModal} setShowModal={setShowModal} />
      <EditService
        object={object}
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
                <th style={{ width: "15%" }}>Type</th>
                <th style={{ width: "15%" }}>Price</th>
                <th style={{ width: "15%" }}>Point</th>
                <th style={{ width: "15%" }}>Time</th>
                <th style={{ width: "150px" }}>Active</th>
                <th style={{ width: "50px" }}></th>
              </tr>
            </thead>
            <tbody>
              {sortedServices.map((service) => (
                <tr key={service[SERVICE_FIELDS.ID]}>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service[SERVICE_FIELDS.ID]}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service[SERVICE_FIELDS.NAME]}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {findTypeName(service[SERVICE_FIELDS.TYPE])}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service[SERVICE_FIELDS.PRICE]}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service[SERVICE_FIELDS.POINT]}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service[SERVICE_FIELDS.TIME]}
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {service[SERVICE_FIELDS.ACTIVE] === true ? (
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
                        bsPrefix="icon-dropdown-toggle"
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
                        <Dropdown.Item
                          onClick={() => {
                            setObject(service);
                            setShowConfirm(true);
                          }}
                        >
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
    </div>
  );
}
