import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import "../MainDash/MainDash.css";
import "../Table/Table.css"
import Datatable from "react-data-table-component";
import { getPaidAppointments } from "../../../axios/services/AdminServices";

const MainDash = () => {
  const [paidAppointments, setPaidAppointments] = useState("");
  const token = JSON.parse(localStorage.getItem("admin")).token;

  const fetchData = async() => {
    const allPaidAppointments = await getPaidAppointments(token);
    setPaidAppointments(allPaidAppointments.paidAppointments);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      name: "Approval status",
      selector: (row) => row.status,
    },
    {
      name: "Payment Status",
      selector: (row) => row.paymentStatus,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
  ];

  return (
    <>
    {" "}
    <div className="container">
      <div className="row mt-4">
      <h1>DASHBOARD</h1>
      </div>
    <div className="MainDash">
      <Cards />
      <div className="Table">
      <h3>Paid Appointments</h3>

      <Datatable
        columns={columns}
        data={paidAppointments}
        fixedHeader
        fixedHeaderScrollHeight="700px"
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

export default MainDash;
