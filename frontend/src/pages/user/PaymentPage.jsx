import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRazorpay from "react-razorpay";
import { getDoctorDetails } from "../../axios/services/DoctorServices";
import {
  orderVerifyPayment,
  placeBooking,
} from "../../axios/services/HomeServices";
import './PaymentPage.css'

const PaymentPage = () => {
  const { id } = useParams();
  console.log("in payment");
  const bookingData = JSON.parse(decodeURIComponent(id));
  console.log(bookingData);

  const navigate = useNavigate();

  const [docDetails, setDocDetails] = useState("");
  const token = JSON.parse(localStorage.getItem("user")).token;
  const userId = JSON.parse(localStorage.getItem("user")).userExists?._id;
  console.log(userId + "userId");

  const fetchData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = await getDoctorDetails(bookingData?.docId);
    console.log(data);
    if (!user) {
      navigate("/login");
    } else {
      setDocDetails(data.doctorDetails);
    }
  };
  console.log(docDetails);
  useEffect(() => {
    fetchData();
  }, []);

  const Razorpay = useRazorpay();

  const payment = useCallback(async () => {
    const data = await placeBooking(token, bookingData);
    console.log(data);
    console.log("above is placebooking data");

    const options = {
      key: "rzp_test_tofGvmp2BOkbs9",
      amount: data.order.amount,
      currency: "INR",
      name: "Click N Visit",
      description: "Online Transaction",
      image: "https://cdn-icons-png.flaticon.com/512/4003/4003833.png",
      order_id: data.order.id,
      handler: (res) => {
        verifiyPayment(res, data.order);
      },
      prefill: {
        name: "",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#ED5359",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();

    async function verifiyPayment(res, order) {
      const verification = await orderVerifyPayment(token, res, order);
      console.log("above is verification");
      console.log(verification);
      if (verification.message) {
        navigate("/paymentSuccess");
      } else {
        alert("error Pls try again...");
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="paymentpage">
        <MDBContainer fluid className="p-5">
          <MDBCard>
            <MDBCardBody>
              <MDBRow className="d-flex justify-content-center pb-5">
                <MDBCol md="7" xl="6" className="mb-4 mb-md-0">
                  <div className="py-4 d-flex flex-row">
                    <h5>
                      <span className="far fa-check-square pe-2"></span>
                      <b>REQUIRED</b> |
                    </h5>
                    <span className="ps-2">Pay</span>
                  </div>
                  <h4 className="text-success">
                    Rs. {docDetails?.feesPerConsultation}
                  </h4>
                  <h4>
                    Dr. {docDetails.firstname} {docDetails.lastname}{" "}
                    (specialist)
                  </h4>
                  <div className="d-flex pt-2">
                    <div>
                      <p>
                        <b>
                          Your appointment will be scheduled on{" "}
                          <span className="text-success">
                            {bookingData.date} at {bookingData.time}
                          </span>
                        </b>
                      </p>
                    </div>
                  </div>
                  <li>
                    Payment is due in full at the time of booking your
                    appointment.{" "}
                  </li>
                  <li>
                    We reserve the right to cancel or reschedule your
                    appointment due to unforeseen circumstances.
                  </li>
                  <li>
                    We take the security of your payment information seriously
                    and use industry-standard encryption to protect your data.
                  </li>
                  <li>
                    By making a payment through our payment page, you agree to
                    our terms and conditions and privacy policy.
                  </li>

                  <hr />
                  <div className="pt-2">
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <MDBRadio
                          name="radioNoLabel"
                          id="radioNoLabel1"
                          checked
                        />
                      </div>
                      <div className="rounded border d-flex w-100 p-3 align-items-center">
                        <p className="mb-0">
                          <MDBIcon
                            fab
                            icon="cc-amazon-pay"
                            size="lg"
                            className="text-dark pe-2"
                          />{" "}
                          Pay with RazorPay
                        </p>
                      </div>
                    </div>
                    <MDBBtn block size="lg" onClick={payment}>
                      Proceed to payment
                    </MDBBtn>
                  </div>
                </MDBCol>
                <MDBCol md="5" xl="4" offsetXl="1">
                  {" "}
                  <div className="py-4 d-flex justify-content-end">
                    <h6>
                      <Link to="/findDoctor">Cancel and return to website</Link>
                    </h6>
                  </div>
                  <div
                    className="rounded d-flex flex-column p-2"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div className="p-2 me-3">
                      <h4>Order Recap</h4>
                    </div>
                    <div className="p-2 d-flex">
                      <MDBCol size="8">Consultation fees</MDBCol>
                      <div className="ms-auto">
                        Rs. {docDetails.feesPerConsultation}
                      </div>
                    </div>
                    <div className="border-top px-2 mx-2"></div>
                    <div className="p-2 d-flex pt-3">
                      <MDBCol size="8">
                        <b>Total</b>
                      </MDBCol>
                      <div className="ms-auto">
                        <b className="text-success">
                          Rs. {docDetails.feesPerConsultation}
                        </b>
                      </div>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </>
  );
};

export default PaymentPage;
