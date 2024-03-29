import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="paymentsuccess-page">
        <MDBContainer fluid>
          <MDBCard
            style={{
              width: "90%",
              height: "450px",
              backgroundColor: "lightgreen",
              color: "black",
            }}
          >
            <MDBCardBody className="d-flex justify-content-center pb-5">
              <MDBRow className="justify-content-center align-items-center">
                <MDBCol>
                  <h1>PAYMENT SUCCESSFULL</h1>
                  <h3>Your appointment has been scheduled</h3>
                  {/* <i class="far fa-check-circle"></i> */}
                  <MDBBtn
                    onClick={() => navigate("/view-appointments")}
                    size="lg"
                  >
                    View your appointments
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
