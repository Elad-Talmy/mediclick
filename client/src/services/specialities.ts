import { api } from './api';

export const getSpecialities = async () => api.get('/doctors/speciality');
