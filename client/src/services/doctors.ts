import { Doctor, RequestField } from '../types';
import { api } from './api';

// export const getDoctorsByField = async (
//    specialty: RequestField
// ): Promise<Doctor[]> => {
//    try {
//       return await new Promise((resolve) => {
//          setTimeout(() => {
//             resolve(
//                MOCK_DOCTORS.filter((doc) => doc.specialtyId === specialty.id)
//             );
//          }, 300);
//       });
//    } catch (err) {
//       throw new Error('Failed to load doctors.');
//    }
// };

// export const searchDoctors = async (query: string): Promise<Doctor[]> => {
//    try {
//       return await new Promise((resolve) => {
//          setTimeout(() => {
//             const q = query.toLowerCase();
//             resolve(
//                MOCK_DOCTORS.filter((doc) => doc.name.toLowerCase().includes(q))
//             );
//          }, 300);
//       });
//    } catch (err) {
//       throw new Error('Search failed. Try again later.');
//    }
// };

export const getDoctorsBySpeciality = async (speciality: string) =>
   api.post('/doctors/speciality', { speciality });
