import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { BillContext } from "../context/BillContext"; // Assuming you have a BillContext
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Confirm from "../shared/Modal/Confirm";
import { toastSuccess } from "../shared/toastify";

const CreateBill = ({ showModal, setShowModal }) => {
  const [formValues, setFormValues] = useState(null);
  const { services, createBill } = useContext(BillContext); // Adjust based on your BillContext
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = (resetForm) => {
    if (formValues) {
      const updatedValues = {
        ...formValues,
        totalAmount:
          Number(formValues.totalAmount) * 1000 - Number(formValues.discount), // Trừ discount
      };
      createBill(updatedValues);
    }
    setShowConfirm(false);
    setShowModal(false);
    resetForm();
    toastSuccess("Bill Created Successfully");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Hàm xử lý chọn dịch vụ và tính tổng tiền
  const handleServiceChange = (e) => {
    const selectedServiceIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    // Tìm các dịch vụ đã chọn từ mảng services
    const selectedServices = services.filter((service) =>
      selectedServiceIds.includes(service.id)
    );

    // Tính tổng số tiền dựa trên giá của các dịch vụ đã chọn
    const totalAmount = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0
    );

    // Cập nhật vào formik các giá trị đã chọn và tổng tiền
    formik.setFieldValue("serviceList", selectedServiceIds);
    formik.setFieldValue("totalAmount", totalAmount);
  };

  const formik = useFormik({
    initialValues: {
      customerName: "",
      serviceList: [],
      totalAmount: 0,
      discount: 0,
      date: "",
    },
    onSubmit: (values) => {
      setFormValues(values);
      setShowConfirm(true);
    },
    validationSchema: yup.object().shape({
      customerName: yup.string().required("Customer Name is required."),
      serviceList: yup.array().min(1, "At least one service must be selected."),
      totalAmount: yup
        .number()
        .required("Total Amount is required.")
        .typeError("Please enter a valid number"),
      discount: yup
        .number()
        .required("Discount is required.")
        .typeError("Please enter a valid number"),
      date: yup.date().required("Date is required."),
    }),
  });

  return (
    <>
      <Confirm
        action={"create"}
        showConfirm={showConfirm}
        onConfirm={() => handleConfirm(formik.resetForm)}
        onCancel={handleCancel}
      />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Bill
          </Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikCustomerName"
              >
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  placeholder="Customer Name"
                  value={formik.values.customerName}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.customerName && !!formik.errors.customerName
                  }
                  isValid={
                    formik.touched.customerName && !formik.errors.customerName
                  }
                />
                {formik.errors.customerName ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.customerName}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationFormikDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.date && !!formik.errors.date}
                  isValid={formik.touched.date && !formik.errors.date}
                />
                {formik.errors.date ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.date}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="12"
                controlId="validationFormikServiceList"
              >
                <Form.Label>Service List</Form.Label>
                <Form.Select
                  name="serviceList"
                  value={formik.values.serviceList}
                  aria-label="Select services"
                  multiple
                  onChange={handleServiceChange} // Sử dụng hàm xử lý mới
                  isInvalid={
                    formik.touched.serviceList && !!formik.errors.serviceList
                  }
                  isValid={
                    formik.touched.serviceList && !formik.errors.serviceList
                  }
                >
                  {services &&
                    services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                </Form.Select>
                {formik.errors.serviceList ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.serviceList}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikTotalAmount"
              >
                <Form.Label>Total Amount</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    placeholder="Total Amount"
                    name="totalAmount"
                    value={formik.values.totalAmount}
                    readOnly // Không cho phép người dùng chỉnh sửa
                    isInvalid={
                      formik.touched.totalAmount && !!formik.errors.totalAmount
                    }
                    isValid={
                      formik.touched.totalAmount && !formik.errors.totalAmount
                    }
                  />
                  <InputGroup.Text>VND</InputGroup.Text>
                  {formik.errors.totalAmount ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.totalAmount}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationFormikDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Discount"
                  name="discount"
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.discount && !!formik.errors.discount
                  }
                  isValid={formik.touched.discount && !formik.errors.discount}
                />
                {formik.errors.discount ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.discount}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)}>Close</Button>
            <Button type="submit">Create Bill</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBill;
