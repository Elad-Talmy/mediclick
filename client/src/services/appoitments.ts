import { Appointment, AppointmentState } from '../types';
import { api, API_BASE } from './api';

export const bookAppointment = async (appointment: Appointment) =>
   api.post(`/appointments`, appointment);

export const getAppointments = async (): Promise<AppointmentState> => {
   const token = localStorage.getItem('token');
   const res = await fetch(`${API_BASE}/appointments`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   return res.json();
};

export const cancelAppointment = async (id: string) =>
   api.delete(`/appointments/${id}`);
