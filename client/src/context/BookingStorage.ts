import { BookingState } from '../types';

const KEY = 'booking-session';

export const saveBookingSession = (state: BookingState) => {
   sessionStorage.setItem(KEY, JSON.stringify(state));
};

export const loadBookingSession = () => {
   const data = sessionStorage.getItem(KEY);
   return data ? JSON.parse(data) : null;
};

export const clearBookingSession = () => {
   sessionStorage.removeItem(KEY);
};
