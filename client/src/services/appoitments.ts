import { BookingRequest } from '../types';

export const getAppointments = async () => {
   try {
      console.log('apps');
      return {
         upcoming: [
            {
               id: 'a1',
               time: { label: '2025-04-20' },
               doctor: {
                  label: 'Dr. Maya',
                  id: 'aaa',
                  pfp: 'https://i.pravatar.cc/150?img=47',
               },
               speciality: { label: 'Dermatology', id: '1234' },
            },
         ],
         past: [
            {
               id: 'a2',
               time: { label: '2025-03-10' },
               doctor: {
                  label: 'Dr. Ben',
                  id: 'aa',
                  pfp: 'https://i.pravatar.cc/150?img=51',
               },
               speciality: { label: 'Pediatrics', id: '123' },
            },
         ],
      };
   } catch (err) {
      console.error('Fetch appointments failed:', err);

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
