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