import { Doctor, RequestField } from '../types';

const MOCK_DOCTORS: Doctor[] = [
   { id: 'd1', name: 'Dr. Cohen', bio: 'Cardiology expert', specialtyId: '1' },
   {
      id: 'd2',
      name: 'Dr. Ben-David',
      bio: 'Pediatric specialist',
      specialtyId: '2',
   },
   { id: 'd3', name: 'Dr. Levi', bio: 'General physician', specialtyId: '1' },
];

export const getDoctorsByField = async (
   specialty: RequestField
): Promise<Doctor[]> => {
   try {
      return await new Promise((resolve) => {
         setTimeout(() => {
            resolve(
               MOCK_DOCTORS.filter((doc) => doc.specialtyId === specialty.id)
            );
         }, 300);
      });
   } catch (err) {
      throw new Error('Failed to load doctors.');
   }
};

export const searchDoctors = async (query: string): Promise<Doctor[]> => {
   try {
      return await new Promise((resolve) => {
         setTimeout(() => {
            const q = query.toLowerCase();
            resolve(
               MOCK_DOCTORS.filter((doc) => doc.name.toLowerCase().includes(q))
            );
         }, 300);
      });
   } catch (err) {
      throw new Error('Search failed. Try again later.');
   }
};
