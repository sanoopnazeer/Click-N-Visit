import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAdminInstance, axiosDoctorInstance, axiosUserInstance } from "../axios";

// User
export const signIn = (formData) => axiosUserInstance.post("/signin", formData)
export const userLogin = createAsyncThunk("user/login", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
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
        toast.success("Register Successful")
        navigate("/")
        return response.data;
        // setMsg(response.msg)
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

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