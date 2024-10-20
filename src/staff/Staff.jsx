import React, { useContext, useState } from "react";
import { StaffContext } from "../context/StaffContext";
import { Button, Dropdown, Form, Spinner, Table } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import { PiSmileySad } from "react-icons/pi";
import { sortData } from "../shared/sortData";
import SortDropdown from "../shared/SortDropdown";
import { toastSuccess } from "../shared/toastify";
import Confirm from "../shared/Modal/Confirm";
import CreateStaff from "./CreateStaff";
import EditStaff from "./EditStaff";

export default function Staff() {
  const {
    staff = [], // Sử dụng đúng tên biến 'staff'
    loading,
    error,
    handleDeleteStaff,
  } = useContext(StaffContext);

  console.log("Original Staffs from API:", staff); // Kiểm tra dữ liệu nhân viên từ API (Bước 1)

  const [showModal, setShowModal] = useState(false);
  const [sortOption, changeSortOption] = useState("no-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [object, setObject] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = (staff) => {
    setObject(staff);
    setShowEditModal(true);
  };

  const handleDelete = (object) => {
    setShowConfirm(false);
    handleDeleteStaff(object.id);
    toastSuccess("Delete Staff Successfully");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Lọc danh sách nhân viên dựa trên searchQuery
  const filteredStaffs = staff.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Filtered Staffs:", filteredStaffs); // Kiểm tra dữ liệu sau khi lọc (Bước 2)

  // Sắp xếp danh sách nhân viên
  const sortedStaffs = sortData(filteredStaffs, sortOption);
  console.log("Sorted Staffs after sorting:", sortedStaffs); // Kiểm tra dữ liệu sau khi sắp xếp (Bước 2)

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
      <CreateStaff showModal={showModal} setShowModal={setShowModal} />
      <EditStaff
        object={object}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-0">Staff Management</h2>
        <Button
          style={{
            backgroundColor: "#DEC7A6",
            borderColor: "#DEC7A6",
            color: "black",
          }}
          onClick={() => setShowModal(true)}
        >
          Add Staff
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
              placeholder="Search by staff name"
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
          page={"staff"}
        />
      </div>
      {/* Kiểm tra xem có nhân viên nào không */}
      {sortedStaffs.length > 0 ? (
        <Table striped borderless hover>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>No</th>
              <th style={{ width: "25%" }}>Name</th>
              <th style={{ width: "25%" }}>Phone</th>
              <th style={{ width: "25%" }}>Email</th>
              <th style={{ width: "25%" }}>Password</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedStaffs.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.name}</td>
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>{staff.password}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-custom-components"
                      bsPrefix="icon-dropdown-toggle"
                      style={{ border: "none" }}
                    >
                      <SlOptionsVertical size={20} style={{ color: "black" }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEdit(staff)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setObject(staff);
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
      ) : (
        <div style={{ marginTop: "200px" }}>
          <PiSmileySad size={"100px"} />
          <h2>No Staff Found</h2>
        </div>
      )}
    </div>
  );
}
