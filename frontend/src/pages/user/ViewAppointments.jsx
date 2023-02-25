import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { updateStatus } from "../../axios/services/DoctorServices";
import { getUserAppointments } from "../../axios/services/HomeServices";
import Navbar from "../../components/Navbar";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState("");

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const userId = JSON.parse(localStorage.getItem("user")).userExists._id;
    console.log(userId);
    const data = await getUserAppointments(token, userId);
    setAppointments(data.appointmentsDetails);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  console.log(appointments);

  const handleSubmit = async (row, status) => {
        try {
        console.log(status)
      const response = await updateStatus({ appointmentId: row._id, status });
      console.log(response)
      if (response.status) {
        toast.success(response.message);
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  const columns = [
    {
      name: "Token number",
      selector: (row) => row._id,
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
      name: "Action",
      selector: (row) => {
        return (
          <div>
            {" "}
            {row.status === "pending" ? (
              <button
                className="btn btn-danger"
                   onClick={() => handleSubmit(row, "cancelled")}
              >
                CANCEL
              </button>
            ) : (
              <button
                className="btn btn-danger"
                disabled
              >
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
      <div className="container-fluid p-2">
        <h1>YOUR APPOINTMENTS</h1>
      </div>
      <div className="container">
        <div className="row mt-5"></div>
        <DataTable
          columns={columns}
          data={appointments}
          fixedHeader
          fixedHeaderScrollHeight="500px"
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default ViewAppointments;
