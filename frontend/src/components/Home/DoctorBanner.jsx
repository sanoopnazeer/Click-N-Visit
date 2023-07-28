import React from "react";
import DoctorBannerImage from "../../assets/images/doctor.webp";
import "./DoctorBanner.css";
import { Link } from "react-router-dom";

const DoctorBanner1 = () => {
  return (
    <main>
      <section className="banner-container">
        <div className="container">
          <div className="left-section">
            <h1>
              Healthcare <br /> When All Else <br /> Fails
            </h1>
            <p>
              Our website is easy to navigate and allows you to search for
              doctors based on your specific needs. You can search by specialty.
              Once you've found a doctor that you're interested in, you can
              easily book an appointment online.
            </p>
            <h4>Check out the industry experts</h4>
            <Link to="/findDoctor">
              <button className="btn btn-primary">Find your doctor</button>
            </Link>
            <Link to="/doctorSignup">
              <button className="btn btn-light">Join us</button>
            </Link>
          </div>
          <div className="right-section">
            <img
              src={DoctorBannerImage}
              alt="banner"
              className="doctor-banner-img"
              width={350}
              height={500}
            />
          </div>
        </div>
      </section>

      <section className="section-two">
        <div className="banner-container-2">
          <div className="bannerImage-container">
            <img
              src="https://hms.harvard.edu/sites/default/files/media/800-Doctors-Talking-GettyImages-1421919753.jpg"
              alt="banner"
              className="lawyer-banner-img"
            />
          </div>
          <div className="banner-container-2-text">
            <p>
              "We believe that everyone deserves access to quality healthcare,
              which is why we work with a network of trusted healthcare
              providers to bring you the best care possible.
              <br />
              <br /> Our doctors are highly qualified and experienced in their
              respective fields, and are committed to providing the highest
              level of care to their patients. <br />
              <br />
              Thank you for choosing our doctor booking website for your
              healthcare needs. We look forward to helping you find the care you
              deserve."
            </p>
          </div>

          {/* <button className="btn btn-success">Find your doctor</button>
          <button className="btn btn-primary">Join us</button> */}
        </div>
      </section>

      {/* <section className="section-three">
        <div className="banner-container-3">
          <img
            src="https://img.pikbest.com/backgrounds/20220119/medical-doctor-blue-minimalist-background_6244083.jpg!bw700"
            alt="banner"
            className="lawyer-banner-img"
            width={1300}
            height={500}
          />
        </div>
      </section> */}
    </main>
  );
};

export default DoctorBanner1;
