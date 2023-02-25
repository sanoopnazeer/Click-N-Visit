import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import {
  getAppointmentRequests,
  updateStatus,
} from "../../axios/services/DoctorServices";
import Layout from "../../components/Doctor/Layout";

const AppointmentRequests = () => {
  const [appointments, setAppointments] = useState("");
  const token = JSON.parse(localStorage.getItem("doctor")).token;

  const fetchData = async () => {
    const docId = JSON.parse(localStorage.getItem("doctor")).doctorExists?._id;
    const data = await getAppointmentRequests(token, docId);
    setAppointments(data.appointmentDetails);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(appointments);

  const handleStatus = async (row, status) => {
    try {
        console.log(status)
      const response = await updateStatus({ appointmentId: row._id, status }, token);
      console.log(response)
      if (response.status) {
        toast.success(response.message);
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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
              <>
                <button
                  className="btn btn-success"
                  onClick={() => handleStatus(row, "approved")}
                >
                  APPROVE
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleStatus(row, "rejected")}
                >
                  REJECT
                </button>
              </>
            ):(
                <>
                <button
                  className="btn btn-success"
                  disabled
                  onClick={() => handleStatus(row, "approved")}
                >
                  APPROVE
                </button>
                <button
                  className="btn btn-danger"
                  disabled
                  onClick={() => handleStatus(row, "rejected")}
                >
                  REJECT
                </button>
              </> 
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <div className="p-2">
        <h1>APPOINTMENT REQUESTS</h1>
      </div>
      <div className="container">
        <div className="row mt-5"></div>
        <DataTable
          columns={columns}
          data={appointments}
          fixedHeader
          // fixedHeaderScrollHeight="500px"
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          pagination
        />
      </div>
    </Layout>
  );
};

export default AppointmentRequests;
