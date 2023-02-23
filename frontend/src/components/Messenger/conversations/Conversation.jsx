import React, { useEffect, useState } from 'react'
import { getDoctorProfile } from '../../../axios/services/DoctorServices'
import './Conversation.css'

const Conversation = ({conversation, currentUser}) => {

  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    const docId = conversation.members.find((m) => m !== currentUser._id)
    
    const getDoctor = async () => {
      const token = localStorage.getItem('user')
      const res = await getDoctorProfile(token, docId)
      setDoctor(res.doctorProfile)
    }
    getDoctor();
  }, [currentUser, conversation])
  
  return (
    <div className="conversation">
        <img className='conversationImg' src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="profile-pic" srcset="" />
        <span className='conversationName'>{doctor?.firstname} {doctor?.lastname}</span>
    </div>
  )
}

export default Conversation