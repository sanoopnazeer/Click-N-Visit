import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAdminInstance, axiosDoctorInstance, axiosUserInstance } from "../axios";

// User
export const signIn = (formData) => axiosUserInstance.post("/signin", formData)
export const userLogin = createAsyncThunk("user/login", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
      console.log("home service signin")
        const response = await signIn(formValue)
        toast.success("Login Successful")
        navigate("/")
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const signUp = (formData) => axiosUserInstance.post("/signup", formData)
export const userRegister = createAsyncThunk("user/register", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await signUp(formValue)
        if(response.data.status==="pending"){
          const id = response.data.data.userId
          toast.success(response.data.message)
          navigate(`/emailVerification/${id}`);
        }
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const verifyOTP = async (otp, id) => {
  console.log('in verify otp')
  const { data } = await axiosUserInstance.post(`/verifyOTP/${id}`, otp);
  if (data) {
    return data;
  }
};

export const resendOtp = async (email) => {
  console.log('in verify otp')
  const { data } = await axiosUserInstance.post(`/resendOtp`, email);
  if (data) {
    return data;
  }
};

export const sendResetLink = async (email) => {
  const { data } = await axiosUserInstance.post('/resetLink', email);
  if (data) {
    return data;
  }
};

export const validateUser = async (token, userId) => {
  const {data} = await axiosUserInstance.get(`/validateUser/${userId}/${token}`);
  if(data){
    return data
  }
}

export const setNewPassword = async (token, userId, newPassword) => {
  const {data } = await axiosUserInstance.post(`/changePassword/${userId}/${token}`, newPassword)
  if(data){
    return data;
  }
}

// Admin 
export const adminSignIn = (formData) => axiosAdminInstance.post("/adminLogin", formData)
export const adminLogin = createAsyncThunk("admin/adminLogin", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await adminSignIn(formValue)
        toast.success("Admin Login Successful")
        navigate("/adminHome")
        console.log(response.data)
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const adminSignUp = (formData) => axiosAdminInstance.post("/adminSignup", formData)
export const adminRegister = createAsyncThunk("admin/adminSignup", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await adminSignUp(formValue)
        toast.success("Register Successful")
        navigate("/adminLogin")
        return response.data;
        // setMsg(response.msg)
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

// Doctor
export const doctorSignIn = (formData) => axiosDoctorInstance.post("/doctorLogin", formData)
export const doctorLogin = createAsyncThunk("doctor/doctorLogin", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await doctorSignIn(formValue)
        toast.success("Doctor Login Successful")
        navigate("/doctorHome")
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const doctorSignUp = (formData) => axiosDoctorInstance.post("/doctorSignup", formData)
export const doctorRegister = createAsyncThunk("doctor/doctorSignup", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await doctorSignUp(formValue)
        toast.success("Doctor Registeration Successful")
        navigate("/doctorLogin")
        return response.data;
        // setMsg(response.msg)
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const getUserProfile = async (token, userId) => {
  // console.log(userId)
  console.log(token)
  console.log('inside home services userid')
  const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.get(`/getUserProfile/${userId}`, config );
    if (data) {
      return data;
    }
}

export const updateUserProfile = async (formData, token) => {
  const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.post(`/updateUserProfile`, {formData}, config );
    if (data.status) {
      return data;
    }
}

export const getUserAppointments = async (token, userId) => {
    console.log(userId)
    console.log('inside home services userid')
    const config = {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosUserInstance.get(`/view-appointments/${userId}`, config );
      if (data.status) {
        return data;
      }
}

export const cancelAppointment = async (cancellationData, token) => {
  console.log('inside home services userid')
  const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.post(`/cancelAppointment`,cancellationData, config );
    if (data.status) {
      return data;
    }
}

export const placeBooking = async (token, bookingData) => {
    console.log('in booking');
    console.log(token);
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosUserInstance.post(`/payment`, bookingData, config);
    if (data) {
      return data;
    }
  };

  export const orderVerifyPayment = async (token, res, order) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const value = {};
    value.res = res;
    value.order = order;
    const { data } = await axiosUserInstance.post(
      '/verifyPayment',
      value,
      config
    );
    if (data.status) {
      return data;
    }
  };
