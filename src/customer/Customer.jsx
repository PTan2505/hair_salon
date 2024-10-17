import React, { useContext, useState } from "react";
import { CustomerContext } from "../context/CustomerContext";
import { Table, Form, Spinner, Dropdown } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import { PiSmileySad } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { sortData } from "../shared/sortData";
import SortDropdown from "../shared/SortDropdown";
import CustomerDetail from "./CustomerDetail";
import { toastError, toastSuccess } from "../shared/toastify";

const Customer = () => {
  const { endpoint } = useParams();
  const { customers, handleDeleteCustomer, loading } =
    useContext(CustomerContext);
  const [sortOption, changeSortOption] = useState("no-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    handleDeleteCustomer(id);
    setShowModal(false);
    toastSuccess("Delete Customer Successfully");
  };

  const filteredCustomers = customers.filter(
    (cust) =>
      cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCustomers = sortData(filteredCustomers, sortOption);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-0">
          {endpoint === "customer" ? "Customer Management" : "Staff Management"}
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
          page={"customer"}
        />
      </div>
      {sortedCustomers.length > 0 ? (
        <>
          <Table striped borderless hover>
            <thead>
              <tr>
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
                <>
                  <CustomerDetail
                    object={cust}
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                  <tr key={cust.id}>
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
                          bsPrefix="icon-dropdown-toggle"
                          style={{ border: "none" }}
                        >
                          <SlOptionsVertical
                            size={20}
                            style={{ color: "black" }}
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => setShowModal(true)}>
                            View Information
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              cust.is_active
                                ? handleDelete(cust.id)
                                : toastError("Customer is deleted already!")
                            }
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                </>
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
};

export default Customer;
