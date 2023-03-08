import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

import DoctorBannerImage from "../../assets/images/doctor.webp";
import { Link } from "react-router-dom";

const DoctorBanner = () => {
  return (
    <Box
      sx={{
        mt: { lg: "80px", xs: "30px" },
        ml: { sm: "50px" },
      }}
    //   position="relative"
      p="20px"
      display="flex"
      justifyContent="space-around"
      className="doctor"
    >
        <Box>
      <Typography color="green" fontWeight="600" fontSize="70px">
        Healthcare <br /> When All Else <br /> Fails
      </Typography>
      <Typography fontWeight={700} mb={2}
      sx={{ fontSize: { lg: '18px', xs: '20px'}}}>
      First-Class, women-centric care for hormone issues & <br /> auto immunity. Get fully-integrative care from a holistic <br /> doctor and nutritionist for $175/month.
      </Typography>
      <Typography fontSize="22px" lineHeight="35px" mb={2}>
        Check out the industry experts
      </Typography>
      <Link to="/findDoctor">
      <Button variant="contained" color="success">Find your Doctor</Button>
      </Link>
      <Link to="/doctorSignup">
      <Button variant="outlined" color="error" style={{ marginLeft: '35px'}}>Join Us</Button>
      </Link>
        </Box>
      <Box>
          <img src={DoctorBannerImage} alt='banner' className="doctor-banner-img" width={350} height={500} />
      {/* <Typography fontWeight={600}
      color="#ff2625"
      sx={{
          opacity: 0.1,
          display: { lg: 'block', xs: 'none'}
        }} fontSize="100px">Doctor</Typography> */}
      </Box>
    </Box>
  );
};

export default DoctorBanner;
