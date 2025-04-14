import { BookingStep } from '../store';

//Regex
export const ISRAELI_PHONE_REGEX = /^05\d{8}$/;

//Pages
export const LOGIN_PAGE = '/login';
export const DASHBOARD_PAGE = '/dashboard';
export const BOOKING_PAGE = '/book';

//Helpers
export const isFirstBookingStep = (step: BookingStep) =>
   step === BookingStep.Specialty;
