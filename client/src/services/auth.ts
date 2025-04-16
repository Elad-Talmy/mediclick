import { api } from './api';

const AUTH = '/auth';

export const getOtp = async (phone: string) =>
   api.post(`${AUTH}/get-otp`, { phone });

export const verifyOtp = async (phone: string, otp: string) =>
   api.post(`${AUTH}/verify-otp`, { phone, otp });
