import axios from "axios";

const API = "http://localhost:5000"; // replace with actual backend
const AUTH = `${API}/auth`

export const getOtp = async (phone: string) => {
  const res = await axios.post(`${AUTH}/get-otp`, { phone });
  return res.data.otp; 
};

export const verifyOtp = async (phone: string, otp: string) => {
  const res = await axios.post(`${AUTH}/verify-otp`, { phone, otp });
  return res.data; // contains JWT
};
