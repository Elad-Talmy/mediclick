import { useAppSelector } from '../../hooks/useAppSelector';
import { BookingStep } from '../../store';
import { ConfirmStep, DoctorStep, SpecialtyStep, TimeStep } from './steps';
import { useBookingNav } from '../../hooks/useBookingNav';
import './BookingPage.less';

export const BookingPage = () => {
   const step = useAppSelector((state) => state.booking.step);
   const handleBack = useBookingNav();

   return (
      <div className="booking-container">
         {step === BookingStep.Specialty && <SpecialtyStep />}
         {step === BookingStep.Doctor && <DoctorStep />}
         {step === BookingStep.Time && <TimeStep />}
         {step === BookingStep.Confirm && <ConfirmStep />}
         <button className="back-btn" onClick={handleBack}>
            ← Back
         </button>
      </div>
   );
};
