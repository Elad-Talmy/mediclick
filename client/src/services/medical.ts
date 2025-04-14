import { MedicalField } from '../types';

export const getMedicalFields = async (): Promise<MedicalField[]> => {
   try {
      return await new Promise((resolve) =>
         setTimeout(() => {
            resolve([
               {
                  id: '1',
                  name: 'Cardiology',
                  description: 'Heart-related care',
               },
               {
                  id: '2',
                  name: 'Pediatrics',
                  description: 'Child specialists',
               },
            ]);
         }, 300)
      );
   } catch (err) {
      throw new Error('Failed to load medical specialties.');
   }
};
