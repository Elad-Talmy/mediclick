import { RequestField } from '../types';

export const getAvailableSlots = async (
   doctorId: RequestField
): Promise<string[]> => {
   const MOCK_SLOTS = [
      '2025-04-13 09:00',
      '2025-04-13 10:30',
      '2025-04-13 12:00',
      '2025-04-13 14:30',
   ];
   return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_SLOTS), 400);
   });
};

export const getAvailableSlotsByDay = async (
   doctorId: string,
   date: string
): Promise<string[]> => {
   const allSlots = ['09:00', '10:00', '11:30', '13:00', '14:30', '16:00'];
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(allSlots);
      }, 300);
   });
};

export const DAYS = ['2025-04-15', '2025-04-16', '2025-04-17']; //MOCKKK
