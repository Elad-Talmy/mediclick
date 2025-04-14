export type MedicalField = {
   id: string;
   name: string;
   description: string;
};

export type Appointment = {
   id: string;
   time: RequestField;
   doctor: RequestField;
   speciality: RequestField;
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
   pfp?: string;
};

export enum BookingStep {
   Specialty = 'specialty',
   Doctor = 'doctor',
   Time = 'time',
   Confirm = 'confirm',
}

export interface BookingState {
   step: BookingStep;
   selectedSpecialty: RequestField | null;
   selectedDoctor: RequestField | null;
   selectedTime: RequestField | null;
}
