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

export type BookingRequest = {
   specialty: RequestField;
   doctor: RequestField;
   time: RequestField;
};

export type RequestField = {
   id?: string;
   label: string;
};
