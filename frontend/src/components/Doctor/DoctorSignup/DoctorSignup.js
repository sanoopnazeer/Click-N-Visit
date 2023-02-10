import React, { useState, useEffect } from "react";
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
  // MDBDropdownMenu,
  // MDBDropdownToggle,
  // MDBDropdownItem,
  // MDBSelect,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { doctorRegister } from "../../../axios/services/HomeServices";
import { getCategories } from "../../../axios/services/AdminServices";
import { TimePicker } from "antd";
import moment from "moment";

const initialState = {
  firstname: "",
  lastname: "",
  specialization: "",
  email: "",
  password: "",
  confirmPassword: "",
  experience: "",
  feesPerConsultation: "",
  timings: ""
};

const DoctorRegister = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categories, setCategories] = useState([]);
  // const [selectedCat, setSelectedCat] = useState("Specialization");

  const { loading, error } = useSelector((state) => ({ ...state.admin }));

  const {
    firstname,
    lastname,
    specialization,
    email,
    password,
    confirmPassword,
    experience,
    feesPerConsultation,
    timings,
  } = formValue;

  const timing = timings && [
    moment(timings[0], "HH:mm"),
    moment(timings[1], "HH:mm"),
  ];

  console.log(timing);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("doctor");
    const data = await getCategories(token);
    setCategories(data.categoryDetails);
    console.log(categories);
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password does not match");
    }
    if (
      firstname &&
      lastname &&
      specialization &&
      email &&
      password &&
      confirmPassword &&
      experience &&
      feesPerConsultation &&
      timings
    ) {
      dispatch(doctorRegister({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };

  return (
    <>
      <div
        className="heading"
        style={{ display: "flex", alignItems: "center" }}
      >
        <h2>Doctor Application</h2>
      </div>
      <div
        style={{
          margin: "auto",
          // padding: "10px",
          maxWidth: "70%",
          alignContent: "center",
          // marginTop: "30px",
        }}
      >
        <MDBCard alignment="left">
          {/* <MDBIcon fas icon="user-circle" className="fa-2x" /> */}
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
                  />
                </div>
              </MDBValidationItem>
              <MDBValidationItem
                className="col-md-12"
                feedback="Please provide your password"
                invalid
              >
                <div className="col-md-12">
                  <MDBInput
                    label="Password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={onInputChange}
                    required
                    invalid
                  />
                </div>
              </MDBValidationItem>
              <MDBValidationItem
                className="col-md-12"
                feedback="Please confirm your password"
                invalid
              >
                <div className="col-md-12">
                  <MDBInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={onInputChange}
                    required
                    invalid
                  />
                </div>
              </MDBValidationItem>
              <h4>Professional Details : </h4>
              <MDBValidationItem
                className="col-md-6"
                feedback="Please provide specialization"
                invalid
              >
                <div className="col-md-12">
                  <MDBDropdown>
                    {/* <label for="Specialization">Specialization</label> */}
                    <select
                      class="form-select"
                      name="specialization"
                      area-label="Default select example"
                      onChange={onInputChange}
                    >
                      <option value="" disabled selected>
                        Specialization
                      </option>
                      {categories.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item._id}>
                              {item.category}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </MDBDropdown>
                </div>
              </MDBValidationItem>
              <MDBValidationItem
                className="col-md-6"
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
                              value: value.map((time) => time.format("HH:mm")),
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
                  Sign Up
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/doctorLogin">
              <p>Already have an account? Login here</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </>
  );
};

export default DoctorRegister;
