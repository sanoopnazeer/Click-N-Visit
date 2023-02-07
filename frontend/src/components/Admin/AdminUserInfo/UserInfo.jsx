import React, { useEffect, useState } from "react";
import { blockUser, getUserInfo, unblockUser } from "../../../axios/services/AdminServices";
import DataTable from "react-data-table-component";
import { Navigate } from "react-router-dom";

const UserInfo = () => {
  const [details, setDetails] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("admin");
    const data = await getUserInfo(token);
    setDetails(data.userDetails);
    console.log(data.userDetails);
  };

  const block = async (userId) => {
    const token = localStorage.getItem("admin");
    const data = await blockUser(token, userId);
    if (data.status) {
      fetchData();
    }
  };

  const unblock = async (userId) => {
    const token = localStorage.getItem("admin");
    const data = await unblockUser(token, userId);
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
      name: "Block/Unblock",
      selector: (row) => {
        return (
          <div>
            {" "}
            {row.isBlocked ? (
              <button
                className="btn btn-success"
                onClick={() => unblock(row._id)}
              >
                UNBLOCK
              </button>
            ) : (
              <button className="btn btn-danger" onClick={() => block(row._id)}>
                Block
              </button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="container">
      <div className="row mt-4">
        <h1> USER MANAGEMENT</h1>
      </div>
      <DataTable
        columns={columns}
        data={details}
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

export default UserInfo;
