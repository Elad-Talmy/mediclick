import { useEffect } from 'react';
import { saveBookingSession } from '../context/BookingStorage';
import { useAppSelector } from './useAppSelector';

export const useBookingSession = () => {
   const booking = useAppSelector((state) => state.booking);

   useEffect(() => {
      saveBookingSession(booking);
   }, [booking]);
};
