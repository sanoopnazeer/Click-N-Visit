import { axiosDoctorInstance } from "../axios";

export const getDoctorByCategory = async (token, catId) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosDoctorInstance.get(`/getDoctorByCategory/${catId}`, config);
    if (data.status) {
      return data;
    }
  };

  export const getDoctorProfile = async (token, docId) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosDoctorInstance.get(`/getDoctorProfile/${docId}`, config);
    if (data.status) {
      return data;
    }
  };

  export const updateDoctorProfile = async (  formData, docId ) => {
    console.log("inside doc services upodate doc profile");
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer ",
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosDoctorInstance.post(`/updateDoctorProfile/${docId}`, {formData, config });
    if (data.status) {
      return data;
    }
  }