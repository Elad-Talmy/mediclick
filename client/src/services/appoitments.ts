export const getAppointments = async () => {
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
};
