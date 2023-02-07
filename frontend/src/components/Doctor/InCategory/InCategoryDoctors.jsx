import "./InCategoryDoctors.css";
import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { getDoctorByCategory } from "../../../axios/services/DoctorServices";

const InCategoryDoctors = () => {

  const [InCatDoc, setInCatDoc] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("user");
    const data = await getDoctorByCategory(token, catId);
    setInCatDoc(data.doctorDetails);
    console.log(data.doctorDetails);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {catId} = useParams();
  console.log(catId);
  console.log(InCatDoc);
  console.log(":hoioooooooooooooo");

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="heading">
            <p>DENTIST</p>
          </div>

          <div className="heading">
            <p>Introducing The Industry Experts In This Field</p>
          </div>
        </div>
      </div>
      <div className="card" style={{ marginTop: "30px", width: "70%" }}>
        <MDBRow className="row-cols-1 row-cols-md-3 g-4">
          {InCatDoc.map((item) => {
            return (
              <MDBCol>
                {/* {item.specialization._id === catId && ( */}

                  <MDBCard alignment="center">
                <MDBCardImage
                  src="https://mdbootstrap.com/img/new/standard/city/041.webp"
                  alt="..."
                  position="top"
                  />
                <MDBCardBody>
                  <MDBCardTitle>{item.firstname + " " + item.lastname}</MDBCardTitle>
                  <MDBCardText>
                    {/* <b>{item.specialization.category}</b> */}
                  </MDBCardText>
                  <MDBBtn href='#'>Book an appointment</MDBBtn>
                </MDBCardBody>
              </MDBCard>
                  {/* )} */}
            </MDBCol>
              )
          })}
        </MDBRow>
      </div>
    </>
  );
};

export default InCategoryDoctors;
