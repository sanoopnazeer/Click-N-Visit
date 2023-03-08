import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../axios/services/DoctorServices";
import Layout from "../../components/Doctor/Layout";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBValidationItem,
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
    moment(timings[0], "h:mm a"),
    moment(timings[1], "h:mm a"),
  ];
  // const {doctor} = useSelector((state) => (state.doctor))
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const { loading, error } = useSelector((state) => ({ ...state.doctor }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const { docId } = useParams();
  const token = JSON.parse(localStorage.getItem("doctor")).token;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDoctorProfile(token, docId);
      setFormValue(data.doctorProfile);
    };
    fetchData();
  }, [docId, token]);

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
    e.preventDefault();
    updateDoctorProfile({ ...formValue }, token);
    navigate("/doctorHome");
    toast.success("Profile updated");
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };

  return (
    <Layout>
      <div className="p-2">
        <h1>MANAGE YOUR PROFILE</h1>
      </div>
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
                              value: value.map((time) => time.format("h:mm a")),
                            },
                          });
                        }}
                        value={timing}
                        format="h:mm a"
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
