import { api } from './api';

export const getDoctorsBySpecialty = async (specialty: string) =>
   api.post('/doctors/specialty', { specialty });

export const getDoctorsById = async (ids: string[]) =>
   api.post('/doctors/id', { ids });

export const searchDoctors = async (query: string) =>
   await api.get('/doctors/search', { doctor: query });
