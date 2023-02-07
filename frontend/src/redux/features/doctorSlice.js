import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doctorLogin } from "../../axios/services/HomeServices";

const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
        doctor: null,
        error: "",
        loading: false
    },
    reducers: {
        setDoctor: (state, action) => {
            state.doctor = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.clear();
            state.doctor = null;
        },
    },
    extraReducers: {
        [doctorLogin.pending]: (state, action) => {
            state.loading = true
        },
        [doctorLogin.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("doctor", JSON.stringify({...action.payload}))
            state.doctor = action.payload
        },
        [doctorLogin.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        // [doctorRegister.pending]: (state, action) => {
        //     state.loading = true
        // },
        // [doctorRegister.fulfilled]: (state, action) => {
        //     state.loading = false
        //     localStorage.setItem("profile", JSON.stringify({...action.payload}))
        //     state.doctor = action.payload
        // },
        // [doctorRegister.rejected]: (state, action) => {
        //     state.loading = false
        //     state.doctor = action.payload.message
        // }
    }
})

export const { setDoctor, setLogout } = doctorSlice.actions;

export default doctorSlice.reducer;