import { api } from './api';

export const getDoctorsBySpecialty = async (specialty: string) =>
   api.post('/doctors/specialty', { specialty });

export const searchDoctors = async (query: string) =>
   await api.get('/doctors/search', { doctor: query });
