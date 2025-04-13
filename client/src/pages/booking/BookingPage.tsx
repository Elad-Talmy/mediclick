import { useAppSelector } from '../../hooks/useAppSelector';
import { SpecialtyStep } from './steps/SpecialityStep';
import { BookingStep } from '../../store';
import './BookingPage.less';

export const BookingPage = () => {
   const step = useAppSelector((state) => state.booking.step);

   return (
      <div className="booking-container">
         {step === BookingStep.Specialty && <SpecialtyStep />}
         {/* {step === BookingStep.Doctor && <DoctorStep />}
         {step === BookingStep.Time && <TimeStep />}
         {step === BookingStep.Confirm && <ConfirmStep />} */}
      </div>
   );
};
