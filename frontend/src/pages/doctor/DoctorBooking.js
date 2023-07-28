import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  // bookAppointment,
  checkAvailability,
  getSingleDoctor,
} from "../../axios/services/DoctorServices";
import Navbar from "../../components/Navbar";
import "./DoctorBooking.css";

const DoctorBooking = () => {
  const { docId } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(null);
  const navigate = useNavigate();

  const handleAvailability = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if(date==null || time==null){
        toast.error("Select date and time");
      }else{
        const response = await checkAvailability(user, { docId, date, time });
        if (response.success) {
          setIsAvailable(response.appointmentData);
          toast.success(response.message);
        } else {
          setIsAvailable(false);
          toast.error(response.message);
        }
      }
    }else{
      toast.error("Please login to continue");
      navigate('/login')
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSingleDoctor(docId);
      setDoctor(data.doctorDetails);
    };
    fetchData();
  }, [docId]);

  return (
    <>
      <Navbar />
      <div className="doc-booking-container">
        <div className="doc-booking-main">
          <div className="doc-dp">
            <img
              src="https://www.mahdelhi.org/doctorImages/doctor-image-sk-sahoo.jpeg"
              alt="doctor pro pic"
              srcset=""
              width="300px"
              height="300px"
            />
          </div>
          <div className="doc-details-main">
            <div className="doc-details">
              <div className="doc-name">
                <h3>
                  <span className="doc-name1">
                    Dr. {doctor.firstname} {doctor.lastname}
                  </span>
                </h3>
              </div>
              <div className="doc-category">
                <h5>{doctor.specialization?.category}</h5>
              </div>
              <div className="doc-experience">
                <h5>{doctor.experience} years of experience overall</h5>
              </div>
              <div className="doc-fees">
                <h5>Rs. {doctor.feesPerConsultation} consultation fee</h5>
              </div>
              <div className="doc-timings">
                {doctor.timings && (
                  <p>
                    Timings : {doctor?.timings[0]} - {doctor?.timings[1]}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="book-container">
            <div className="doc-check-availability">
              <div className="date-picker">
                <DatePicker
                name="date"
                  onChange={(value) => {
                    setDate(value.format("DD-MM-YYYY"));
                  }}
                  size="large"
                  format="DD-MM-YYYY"
                />
              </div>
              <div className="time-picker">
                <TimePicker
                name="time"
                  onChange={(value) => {
                    setTime(value.format("h:mm a"));
                  }}
                  size="large"
                  format="h:mm a"
                />
              </div>
            </div>
            <button
              type="button"
              class="check-button btn btn-primary btn-lg mt-3"
              onClick={handleAvailability}
            >
              Check Availability
            </button>
            {isAvailable && (
              <Link
                to={`/payment-page/${encodeURIComponent(
                  JSON.stringify(isAvailable)
                )}`}
              >
                <button
                  type="button"
                  class="book-button btn btn-dark btn-lg mt-3"
                  // onClick={handleBooking}
                >
                  Book now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorBooking;
