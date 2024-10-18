import React, { useContext, useState } from "react";
import { Button, Dropdown, Form, Spinner, Table, Image } from "react-bootstrap";
import SortDropdown from "../shared/SortDropdown";
import { SlOptionsVertical } from "react-icons/sl";
import { ServiceContext } from "../context/ServiceContext";
import { sortData } from "../shared/sortData";
import { toastSuccess } from "../shared/toastify";
import { PiSmileySad } from "react-icons/pi";
import Confirm from "../shared/Modal/Confirm";
import AddServiceType from "./AddServiceType";
import EditServiceType from "./EditServiceType";
import { TYPE_FIELDS } from "../shared/constant";

export default function ServiceType() {
  const { servicesType, loading, handleDeleteServiceType } =
    useContext(ServiceContext);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, changeSortOption] = useState("no-desc");
  const [object, setObject] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = (service) => {
    setObject(service);
    setShowEditModal(true);
  };

  const handleDelete = (object) => {
    setShowConfirm(false);
    handleDeleteServiceType(object.id);
    toastSuccess("Delete Service Type Successfully");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const filteredServicesType = servicesType.filter((type) =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedServicesType = sortData(filteredServicesType, sortOption);

  return (
    <div>
      <Confirm
        action={"delete"}
        showConfirm={showConfirm}
        onCancel={handleCancel}
        onConfirm={() => handleDelete(object)}
      />
      <AddServiceType showModal={showModal} setShowModal={setShowModal} />
      <EditServiceType
        object={object}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-0">Service Type Management</h2>
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
          Add Service Type
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
      {sortedServicesType.length > 0 ? (
        <>
          <Table striped borderless hover>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Image</th>
                <th style={{ width: "30%" }}>Name</th>
                <th style={{ width: "30%" }}>Active</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody>
              {sortedServicesType.map((type) => (
                <tr key={type[TYPE_FIELDS.ID]}>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    <Image src={type.image} style={{ width: 50, height: 50 }} />
                  </td>
                  <td style={{ alignContent: "center", height: "100px" }}>
                    {type.name}
                  </td>
                  <td
                    style={{
                      // @ts-ignore
                      textAlign: "-webkit-center",
                      height: "100px",
                    }}
                  >
                    {type.is_active === true ? (
                      <div
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: "1rem",
                          margin: "30px",
                          width: "100px",
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
                          width: "100px",
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
                        <Dropdown.Item onClick={() => handleEdit(type)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setObject(type);
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
