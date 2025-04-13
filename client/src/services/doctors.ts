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
   speciality: RequestField
): Promise<Doctor[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(
            MOCK_DOCTORS.filter((doc) => doc.specialtyId === speciality.id)
         );
      }, 500);
   });
};
