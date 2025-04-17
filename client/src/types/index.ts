export type Appointment = {
   _id: string;
   time: string;
   doctor: Doctor;
   specialty: string;
   note?: string;
};

export type Doctor = {
   _id: string;
   name: string;
   specialty: string;
   pfp?: string;
   availableSlots: string[];
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
   rescheduleId: string | null;
}

export type AppointmentState = {
   upcoming: Appointment[];
   past: Appointment[];
};
