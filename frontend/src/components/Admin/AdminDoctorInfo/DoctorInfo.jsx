import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { blockDoctor, getDoctorInfo, unblockDoctor } from '../../../axios/services/AdminServices'

const DoctorInfo = () => {
  const [details, setDetails] = useState([])
  
  const fetchData = async () => {
    const token = localStorage.getItem("admin")
    const data = await getDoctorInfo(token)
    setDetails(data.doctorDetails)
    console.log(data);
    console.log("hoiiiiiiiiiiiiiiii");
  }

  useEffect(() => {
    fetchData();    
  }, [])

  const block = async(doctorId) => {
    const token = localStorage.getItem("admin")
    const data = await blockDoctor(token, doctorId)
    if(data.status){
      fetchData()
    }
  }

  const unblock = async(doctorId) => {
    const token = localStorage.getItem("admin")
    const data = await unblockDoctor(token, doctorId)
    if(data.status){
      fetchData()
    }
  }

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
      name: "Specialization",
      selector: (row) => row.specialization.category,
    },
    {
      name: "Approval status",
      selector: (row) => {
        return (
          <div>
            <br />
            {
              row.isApproved ? (
                <p>Approved</p>
              ) : (
                <p>Not Approved</p>
              )
            }
          </div>
        )
      }
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
              <button className="btn btn-danger"
               onClick={() => block(row._id)}
              >
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
        <h1> DOCTOR MANAGEMENT </h1>
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
    )
}

export default DoctorInfo