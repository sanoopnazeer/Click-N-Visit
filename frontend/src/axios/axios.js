import axios from 'axios';

export const axiosUserInstance = axios.create({
  baseURL: 'http://localhost:5000',
});
export const axiosAdminInstance = axios.create({
  baseURL: 'http://localhost:5000/admin',
});
export const axiosDoctorInstance = axios.create({
  baseURL: 'http://localhost:5000/doctor',
});
export const axiosMessageInstance = axios.create({
  baseURL: 'http://localhost:5000/message',
});
export const axiosConversationInstance = axios.create({
  baseURL: 'http://localhost:5000/conversation',
});
