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
