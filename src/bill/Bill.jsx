import React, { useContext, useState } from "react";
import { BillContext } from "../context/BillContext";
import { Button, Dropdown, Form, Spinner, Table } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import { PiSmileySad } from "react-icons/pi";
import { sortData } from "../shared/sortData";
import SortDropdown from "../shared/SortDropdown";
import { toastSuccess } from "../shared/toastify";
import Confirm from "../shared/Modal/Confirm";
import CreateBill from "./CreateBill.jsx";
import EditBill from "./EditBill.jsx";

export default function Bill() {
  const {
    bills = [],
    loading,
    error,
    handleDeleteBill,
  } = useContext(BillContext);

  console.log("Original Bills from API:", bills); // Kiểm tra lại tại đây

  const [showModal, setShowModal] = useState(false);
  const [sortOption, changeSortOption] = useState("no-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [object, setObject] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = (bill) => {
    setObject(bill);
    setShowEditModal(true);
  };

  const handleDelete = (object) => {
    setShowConfirm(false);
    handleDeleteBill(object.id);
    toastSuccess("Delete Bill Successfully");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Lọc danh sách hóa đơn dựa trên searchQuery
  const filteredBills = bills.filter((bill) =>
    bill.CustomerName
      ? bill.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  console.log("Filtered Bills:", filteredBills); // Kiểm tra dữ liệu sau khi lọc

  // Sắp xếp danh sách hóa đơn
  const sortedBills = sortData(filteredBills, sortOption);
  console.log("Sorted Bills after sorting:", sortedBills); // Kiểm tra dữ liệu sau khi sắp xếp

  // Xử lý trạng thái loading và error
  if (loading) {
    return (
      <div style={{ marginTop: "200px" }}>
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ marginTop: "200px", color: "red" }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div>
      <Confirm
        action={"delete"}
        showConfirm={showConfirm}
        onCancel={handleCancel}
        onConfirm={() => handleDelete(object)}
      />
      <CreateBill showModal={showModal} setShowModal={setShowModal} />
      <EditBill
        object={object}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-0">Customer Bills</h2>
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
          Create Bill
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
              placeholder="Search by customer name"
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
          Sort By:
        </span>
        <SortDropdown
          sortOption={sortOption}
          changeSortOption={changeSortOption}
          page={"bill"}
        />
      </div>
      {sortedBills.length > 0 ? (
        <>
          <Table striped borderless hover>
            <thead>
              <tr>
                <th style={{ width: "50px" }}>No</th>
                <th style={{ width: "20%" }}>Customer Name</th>
                <th style={{ width: "15%" }}>Service Booked</th>
                <th style={{ width: "15%" }}>Total Price</th>
                <th style={{ width: "15%" }}>Payment Status</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBills.map((bill, index) => (
                <tr key={bill.id}>
                  <td>{index + 1}</td>
                  <td>{bill.CustomerName}</td>
                  <td>{bill.Service}</td>
                  <td>{bill.price}</td>
                  <td>{bill.paymentstatus}</td>
                  <td>
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
                        <Dropdown.Item onClick={() => handleEdit(bill)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setObject(bill);
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
      ) : (
        <div style={{ marginTop: "200px" }}>
          <PiSmileySad size={"100px"} />
          <h2>No Bills Found</h2>
        </div>
      )}
    </div>
  );
}
