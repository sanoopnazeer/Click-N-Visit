import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import {
  cancelAppointment,
  // cancelAppointment,
  getUserAppointments,
} from "../../axios/services/HomeServices";
import Navbar from "../../components/Navbar";
import Modal from "react-modal";
import "./ViewAppointments.css";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("user")).token;
  const userId = JSON.parse(localStorage.getItem("user")).userExists._id;

  const fetchData = async () => {
    console.log(userId);
    const data = await getUserAppointments(token, userId);
    setAppointments(data.appointmentsDetails);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(appointments);

  // function to handle appointment cancellation
  const cancel = () => {
    setIsModalOpen(true);
  };

  const confirmCancellation = async (row, status) => {
    try {
      console.log(status);
      const response = await cancelAppointment(
        { appointmentId: row._id, status },
        token
      );
      console.log(response);
      if (response.status) {
        toast.success(response.message);

        fetchData();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      padding: "20px",
      backgroundColor: "lightblue",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#333",
    },
    button: {
      backgroundColor: "black",
    },
  };

  // custom styles for the buttons
  const buttonStyles = {
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "red",
  };

  // custom styles for the buttons
  const buttonStyles1 = {
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "green",
  };

  const columns = [
    {
      name: "Doctor name",
      selector: (row) => row.doctorInfo,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Time",
      selector: (row) => row.time,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Payment status",
      selector: (row) => row.paymentStatus,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div>
            {" "}
            {row.status === "pending" ? (
              <>
                <button className="btn btn-danger" onClick={cancel}>
                  CANCEL
                </button>
                <Modal isOpen={isModalOpen} style={customStyles}>
                  <h2>Are you sure you want to cancel this appointment?</h2>
                  <button
                    onClick={() => confirmCancellation(row, "cancelled")}
                    style={buttonStyles}
                  >
                    Yes, cancel
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={buttonStyles1}
                  >
                    No, keep appointment
                  </button>
                </Modal>
              </>
            ) : (
              <button className="btn btn-danger" disabled>
                CANCEL
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="appointments">
        <div className="appointments-container">
          <div className="container-fluid p-2">
            <h1>MY APPOINTMENTS</h1>
          </div>
          <div className="container">
            <div className="row mt-5"></div>
            <DataTable
              columns={columns}
              data={appointments}
              // fixedHeader
              fixedHeaderScrollHeight="500px"
              selectableRows
              selectableRowsHighlight
              highlightOnHover
              pagination
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAppointments;
