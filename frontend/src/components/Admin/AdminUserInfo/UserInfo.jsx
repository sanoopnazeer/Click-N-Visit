import React, { useEffect, useState } from "react";
import { blockUser, getUserInfo, unblockUser } from "../../../axios/services/AdminServices";
import DataTable from "react-data-table-component";

const UserInfo = () => {
  const [details, setDetails] = useState([]);
  const token = JSON.parse(localStorage.getItem("admin")).token;

  const fetchData = async () => {
    const data = await getUserInfo(token);
    setDetails(data.userDetails);
    console.log(data.userDetails);
  };

  const block = async (userId) => {
    const data = await blockUser(token, userId);
    if (data.status) {
      fetchData();
    }
  };

  const unblock = async (userId) => {
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
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Verification status",
      selector: (row) => {
        return (
          <div>
            {" "}
            {row.verified?(<p><br/>verified</p>):(<p><br/>Not verified</p>)}
          </div>
        )
      },
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
