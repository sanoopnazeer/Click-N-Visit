import React, { useEffect } from 'react'
import { Route, Routes} from 'react-router-dom'
import { Box } from '@mui/material'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// import Doctor from './pages/Doctor'
import Home from './pages/user/Home'
import Footer from './components/Footer'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import AdminHome from './pages/admin/AdminHome';
import AdminLogin from './pages/admin/AdminLogin';
import PrivateRoutes from './utils/PrivateRoutes';
import './App.css'

import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';
import AdminSignup from './pages/admin/AdminSignup';
import DoctorSignup from './pages/doctor/DoctorSignup';
import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorHome from './pages/doctor/DoctorHome';
import FindDoctor from './pages/doctor/FindDoctor';
import InCategoryDoctorsList from './pages/doctor/InCategoryDoctorsList';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorBooking from './pages/doctor/DoctorBooking';
import AppointmentRequests from './pages/doctor/AppointmentRequests';
import ViewAppointments from './pages/user/ViewAppointments';
import PaymentPage from './pages/user/PaymentPage';
import Messenger from './pages/messenger/Messenger';
import PaymentSuccessPage from './pages/user/PaymentSuccessPage';
import UserProfile from './pages/user/UserProfile';


const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user))
  })
  
  return (
    <Box width = "400px" sx={{ width: {xl: '1488px' }}} m="auto">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/view-appointments" element={<ViewAppointments />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/doctorSignup" element={<DoctorSignup />} />
        <Route path="/doctorLogin" element={<DoctorLogin />} />
        <Route path="/doctorHome" element={<DoctorHome />} />
        <Route path="/doctorProfile/:docId" element={<DoctorProfile />} />
        <Route path="/appointment-requests" element={<AppointmentRequests />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/findDoctor" element={<FindDoctor />} />
        <Route path="/view-doctors/:catId" element={<InCategoryDoctorsList />} />
        <Route path="/single-doctor/:docId" element={<DoctorBooking />} />
        <Route path="/payment-page/:id" element={<PaymentPage />} />
        <Route path="/paymentSuccess" element={<PaymentSuccessPage />} />
        <Route path="/messenger" element={<Messenger />} />
        {/* <Route element={<PrivateRoutes />}> */}
            <Route path="/adminHome" element={<AdminHome />}/>
        {/* </Route> */}
      </Routes>
      <Footer />
    </Box>
  )
}

export default App