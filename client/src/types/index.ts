export type MedicalField = {
   id: string;
   name: string;
   description: string;
};

export type Appointment = {
   id: string;
   date: string;
   doctor: string;
   field: string;
};

export type Doctor = {
   id: string;
   name: string;
   bio: string;
   specialtyId: string;
};
