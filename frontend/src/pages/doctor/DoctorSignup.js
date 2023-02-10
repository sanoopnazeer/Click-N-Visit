import React from 'react'
import Navbar from '../../components/Navbar'
import DoctorSignup from '../../components/Doctor/DoctorSignup/DoctorSignup'
import ApplyDoctor from '../../components/Doctor/DoctorSignup/ApplyDoctor'

const doctorSignup = () => {
  return (
    <div>
        <Navbar />
        <DoctorSignup />
        {/* <ApplyDoctor/> */}
    </div>
  )
}

export default doctorSignup