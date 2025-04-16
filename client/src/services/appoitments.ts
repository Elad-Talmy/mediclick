import { AppointmentState, BookingRequest } from '../types';
import { api, API_BASE } from './api';

export const bookAppointment = async (
   booking: BookingRequest
): Promise<void> => {
   try {
      return new Promise((resolve) => {
         setTimeout(() => {
            console.log('✅ Appointment booked:', booking);
            resolve();
         }, 700);
      });
   } catch (err) {
      throw new Error('Booking failed. Please try again.');
   }
};

export const getAppointments = async (): Promise<AppointmentState> => {
   const token = localStorage.getItem('token');
   const res = await fetch(`${API_BASE}/appointments`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return res.json();
};

export const cancelAppointment = async (id: string, token: string) =>
   api.delete(`/appointments/${id}`, token);

// export const rescheduleAppointment = async (
//    id: string,
//    newSlot: string,
//    token: string
// ) => api.post(`/appointments/${id}/reschedule`, { dateTime: newSlot }, token);
