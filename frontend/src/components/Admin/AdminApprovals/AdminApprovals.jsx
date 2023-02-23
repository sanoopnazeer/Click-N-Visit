import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  pendingApprovals,
  approve,
} from "../../../axios/services/AdminServices";

const AdminApprovals = () => {
  const [approvals, setApprovals] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("admin");
    const data = await pendingApprovals(token);
    setApprovals(data.approvalDetails);
  };

  const Approve = async (consId) => {
    const token = localStorage.getItem("admin");
    const data = await approve(token, consId);
    if (data.status) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstname + "  " + row.lastname,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "License Number",
      selector: (row) => row.license,
    },
    {
      name: "Specialization",
      selector: (row) => row.specialization.category,
    },
    {
      name: "Experience (years)",
      selector: (row) => row.experience,
    },
    {
      name: "Fees (in rupees)",
      selector: (row) => row.feesPerConsultation,
    },
    {
      name: "Timings",
      selector: (row) => row.timings,
    },
    {
      name: "Approval status",
      selector: (row) => {
        return (
          <div>
            {" "}
            {row.isApproved}
            <button
              className="btn btn-success"
              onClick={() => Approve(row._id)}
            >
              APPROVE
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container">
      <div className="row mt-4">
        <h1> PENDING APPROVALS </h1>
      </div>
      <DataTable
        columns={columns}
        data={approvals}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
      />
    </div>
  );
};

export default AdminApprovals;
