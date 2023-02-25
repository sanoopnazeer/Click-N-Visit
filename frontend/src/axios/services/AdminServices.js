import { axiosAdminInstance } from "../axios";

export const getUserInfo = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get("/getUsers", config);
  if (data.status) {
    return data;
  }
};

export const blockUser = async (token, userId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(`/blockUser/${userId}`, config);
  if (data.status) {
    return data;
  }
};

export const unblockUser = async (token, userId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/unblockUser/${userId}`,
    config
  );
  if (data.status) {
    return data;
  }
};

export const getDoctorInfo = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get("/getDoctors", config);
  if (data.status) {
    return data;
  }
};

export const blockDoctor = async (token, doctorId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/blockDoctor/${doctorId}`,
    config
  );
  if (data.status) {
    return data;
  }
};

export const unblockDoctor = async (token, doctorId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/unblockDoctor/${doctorId}`,
    config
  );
  if (data.status) {
    return data;
  }
};

export const pendingApprovals = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get("/pendingApprovals", config);
  if (data.status) {
    return data;
  }
};

export const approve = async (token, consId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(`/approve/${consId}`, config);
  if (data.status) {
    return data;
  }
};

export const addCategory = async (category, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.post(
    `/addCategory`,
    { category },
    config
  );
  if (data.status) {
    return data;
  }
};

export const getCategories = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(`/getCategories`, config);
  if (data.status) {
    return data;
  }
};

export const deleteCategory = async (token, catId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/deleteCategory/${catId}`,
    config
  );
  if (data.status) {
    return data;
  }
};

export const getAllAppointments = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(`/allAppointments`, config);
  if (data.status) {
    return data;
  }
};
