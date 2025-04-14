import { BookingRequest } from '../types';

export const getAppointments = async () => {
   try {
      return {
         upcoming: [
            {
               id: 'a1',
               date: '2025-04-20',
               doctor: 'Dr. Maya',
               field: 'Dermatology',
            },
         ],
         past: [
            {
               id: 'a2',
               date: '2025-03-10',
               doctor: 'Dr. Ben',
               field: 'Pediatrics',
            },
         ],
      };
   } catch (err) {
      throw new Error('Could not load appointments.');
   }
};

export const bookAppointment = async (
   booking: BookingRequest
): Promise<void> => {
   try {
      // here i need to use the ids for the db

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
