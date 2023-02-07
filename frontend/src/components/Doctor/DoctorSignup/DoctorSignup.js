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

const initialState = {
  firstname: "",
  lastname: "",
  specialization: "",
  email: "",
  password: "",
  confirmPassword: "",
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
  } = formValue;

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
      confirmPassword
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
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Doctor Registeration </h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
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
              feedback="Please provide specialization"
              invalid
            >
              <div className="col-md-12">
                {/* <MDBDropdown>
                  <MDBDropdownToggle>{selectedCat}</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {categories.map((item) => {
                      return (
                        <MDBDropdownItem
                          link
                          onClick={() => setSelectedCat(item.category)}
                        >
                         <p>{item.category}</p>
                        </MDBDropdownItem>
                      );
                    })}
                  </MDBDropdownMenu>
                </MDBDropdown> */}
                {/* <MDBInput
                  label="Specialization"
                  type="text"
                  value={specialization}
                  name="specialization"
                  onChange={onInputChange}
                  required
                  invalid
                /> */}

                {/* <MDBSelect
        {...categories.map((item) => {
          return (
      data={[
        {text:"one", value:1}
      ]}
      );
    })}
    /> */}
                <MDBDropdown>
                  <label for="Specialization">Specialization</label>

                  <select
                    class="form-select"
                    name="specialization"
                    area-label="Default select example"
                    onChange={onInputChange}
                  >
                    <option value="select one" disabled selected>Select one</option>
                    {categories.map((item, index) => {
                      return (
                        <>
                        <option key={index} value={item._id}>{item.category}</option></>
                      );
                    })}
                  </select>
                </MDBDropdown>
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
  );
};

export default DoctorRegister;
