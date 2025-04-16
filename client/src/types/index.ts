export type Appointment = {
   id: string;
   time: string;
   doctor: Doctor;
   speciality: string;
};

export type Doctor = {
   id: string;
   name: string;
   speciality: string;
   pfp?: string;
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
   selectedSpecialty: string | null;
   selectedDoctor: Doctor | null;
   selectedTime: string | null;
}

export type AppointmentState = {
   upcoming: Appointment[];
   past: Appointment[];
};
