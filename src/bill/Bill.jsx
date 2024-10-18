import React, { useContext } from "react";
import { BillContext } from "../context/BillContext";
import { Button, Spinner, Table } from "react-bootstrap";
import { PiSmileySad } from "react-icons/pi";

export default function Bill() {
  const { bills, loading, handleUpdatePaymentStatus } = useContext(BillContext);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-0">Customer Bills</h2>
      </div>

      {bills.length > 0 ? (
        <Table striped borderless hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Customer Name</th>
              <th>Service Booked</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={bill.id}>
                <td>{index + 1}</td>
                <td>{bill.customerName}</td>
                <td>
                  {bill.services.map((service) => service.name).join(", ")}
                </td>
                <td>{bill.totalPrice}</td>
                <td>{bill.isPaid ? "Paid" : "Unpaid"}</td>
                <td>
                  {!bill.isPaid && (
                    <Button
                      style={{
                        backgroundColor: "#DEC7A6",
                        borderColor: "#DEC7A6",
                        color: "black",
                      }}
                      onClick={() => handleUpdatePaymentStatus(bill.id)}
                    >
                      Pay
                    </Button>
                  )}
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
          <h2>No Bills Found</h2>
        </div>
      )}
    </div>
  );
}
