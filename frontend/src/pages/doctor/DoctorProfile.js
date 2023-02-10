import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../axios/services/DoctorServices";
import Layout from "../../components/Doctor/Layout";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
  MDBDropdown,
  MDBRow,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { TimePicker } from "antd";
import moment from "moment";

const DoctorProfile = () => {
  const [formValue, setFormValue] = useState({});
  const {
    firstname,
    lastname,
    // specialization,
    email,
    // password,
    // confirmPassword,
    experience,
    timings,
    feesPerConsultation,
  } = formValue;

  const timing = timings && [
    moment(timings[0], "h:mm A"),
    moment(timings[1], "h:mm A"),
  ];
  console.log(timing);
  // const {doctor} = useSelector((state) => (state.doctor))
  console.log("timing above");
  //   console.log(formValue);
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const { loading, error } = useSelector((state) => ({ ...state.doctor }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const { docId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("doctor");
      const data = await getDoctorProfile(token, docId);
      setFormValue(data.doctorProfile);
    };
    fetchData();
  }, [docId]);

  timings && console.log(timings);

  //   const time = timings && {
  //     timings: [
  //       moment(timings[0]).format("HH:mm"),
  //       moment(timings[1]).format("HH:mm"),
  //     ],
  //   };

  //   console.log(time)
  //   console.log('time above')

  const handleSubmit = (e) => {
    // e.preventDefault();
    updateDoctorProfile({ ...formValue }, docId);
    navigate("/doctorHome");
    toast.success("Profile updated");
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ formValue, [name]: value });
    console.log(formValue);
  };

  return (
    <Layout>
      <h1>MANAGE YOUR PROFILE</h1>
      {doctor && (
        <>
          <div
            style={{
              margin: "auto",
              // padding: "10px",
              maxWidth: "70%",
              alignContent: "center",
              marginTop: "50px",
            }}
          >
            <MDBCard alignment="left">
              {/* <MDBIcon fas icon="user-circle" className="fa-5x" /> */}
              <MDBCardBody>
                <MDBValidation
                  onSubmit={handleSubmit}
                  noValidate
                  className="row g-3"
                >
                  <h4>Personal Details : </h4>
                  <MDBValidationItem
                    className="col-md-6"
                    feedback="Please provide firstname"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Firstname"
                        type="text"
                        value={firstname}
                        name="firstname"
                        onChange={onInputChange}
                        required
                        invalid
                        disabled
                      />
                    </div>
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-6"
                    feedback="Please provide lastname"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Lastname"
                        type="text"
                        value={lastname}
                        name="lastname"
                        onChange={onInputChange}
                        required
                        invalid
                        disabled
                      />
                    </div>
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your email"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Email"
                        type="email"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                        required
                        invalid
                        disabled
                      />
                    </div>
                  </MDBValidationItem>
                  <h4>Professional Details : </h4>
                  {/* <MDBValidationItem
                    className="col-md-6"
                    feedback="Please provide specialization"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Specialization"
                        type="text"
                        value={specialization.category}
                        name="specialization"
                        onChange={onInputChange}
                        required
                        invalid
                        disabled
                      />
                    </div>
                  </MDBValidationItem> */}
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your experience"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Experience"
                        type="experience"
                        value={experience}
                        name="experience"
                        onChange={onInputChange}
                        required
                        invalid
                      />
                    </div>
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your feesPerConsultation"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Fees Per Consultation"
                        type="feesPerConsultation"
                        value={feesPerConsultation}
                        name="feesPerConsultation"
                        onChange={onInputChange}
                        required
                        invalid
                      />
                    </div>
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your timings"
                    invalid
                  >
                    <div className="col-md-12">
                      <label
                        // onChange={onInputChange}
                        htmlFor="timings"
                        // name="timings"
                      >
                        Timings
                      </label>
                      <br />
                      <TimePicker.RangePicker
                        name="timings"
                        onChange={(value) => {
                          onInputChange({
                            target: {
                              name: "timings",
                              value: value.map((time) => time.format("h:mm A")),
                            },
                          });
                        }}
                        value={timing}
                        format="HH:mm"
                      />
                    </div>
                  </MDBValidationItem>
                  <div className="col-12">
                    <MDBBtn style={{ width: "100%" }} className="mt-2">
                      {loading && (
                        <MDBSpinner
                          size="sm"
                          role="status"
                          tag="span"
                          className="me-2"
                        />
                      )}
                      UPDATE YOUR PROFILE
                    </MDBBtn>
                  </div>
                </MDBValidation>
              </MDBCardBody>
            </MDBCard>
          </div>
        </>
      )}
    </Layout>
  );
};

export default DoctorProfile;
