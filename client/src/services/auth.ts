import { api } from './api';

const AUTH = '/auth';

export const getOtp = async (phone: string) =>
   api.post(`${AUTH}/get-otp`, { phone });

export const verifyOtp = async (phone: string, otp: string, name: string) =>
   api.post(`${AUTH}/verify-otp`, { phone, otp, name });

export const getUser = async (token: string) =>
   api.post(`${AUTH}/user`, { token });
