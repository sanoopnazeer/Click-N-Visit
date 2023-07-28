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
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { doctorLogin } from "../../../axios/services/HomeServices";
import "./DoctorLogin.css";

const initialState = {
  email: "",
  password: "",
};

const DoctorLogin = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.doctor }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(doctorLogin({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="doctor-login">
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-5x p-4" />
        <h4>WELCOME DOCTOR</h4>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <MDBCardFooter>
            <Link to="/doctorSignup">
              <p>Don't have an account? Register here</p>
            </Link>
          </MDBCardFooter>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default DoctorLogin;
