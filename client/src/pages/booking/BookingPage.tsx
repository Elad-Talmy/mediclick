import { useAppSelector } from '../../hooks/useAppSelector';
import { ConfirmStep, DoctorStep, SpecialtyStep, TimeStep } from './steps';
import { useBookingNav } from '../../hooks/useBookingNav';
import { BookingStep } from '../../types';
import { useBookingSession } from '../../hooks';
import { BookingProgressBar } from '../../components';
import './BookingPage.less';
import { memo } from 'react';

export const BookingPage = memo(() => {
   const step = useAppSelector((state) => state.booking.step);
   const handleBack = useBookingNav();

   useBookingSession();

   return (
      <div className="booking-container">
         <BookingProgressBar />
         {step === BookingStep.Specialty && <SpecialtyStep />}
         {step === BookingStep.Doctor && <DoctorStep />}
         {step === BookingStep.Time && <TimeStep />}
         {step === BookingStep.Confirm && <ConfirmStep />}
         <button className="back-btn" onClick={handleBack}>
            ← Back
         </button>
      </div>
   );
});
