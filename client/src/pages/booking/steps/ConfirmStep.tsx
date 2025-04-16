import { v4 as uuid } from 'uuid';
import { memo, useCallback } from 'react';
import { clearBookingSession } from '../../../context/BookingStorage';
import { useAppDispatch, useAppSelector, useToast } from '../../../hooks';
import { bookAppointment } from '../../../services';
import { resetBooking } from '../../../store';
import { AppView, goToView } from '../../../store/slices/viewSlice';

export const ConfirmStep = memo(() => {
   const dispatch = useAppDispatch();
   const toast = useToast();
   const { selectedSpecialty, selectedDoctor, selectedTime } = useAppSelector(
      (state) => state.booking
   );

   const handleConfirm = useCallback(async () => {
      try {
         await bookAppointment({
            id: uuid(),
            specialty: selectedSpecialty!,
            doctor: selectedDoctor!,
            time: selectedTime!,
         });

         toast.success('Appointment confirmed!');

         clearBookingSession();
         dispatch(resetBooking());
         dispatch(goToView(AppView.Success));
      } catch (err: any) {
         toast.error(err.message || 'Booking failed.');
      }
   }, [selectedDoctor, selectedSpecialty, selectedTime, dispatch, toast]);

   return (
      <div>
         <h2>Confirm Your Appointment</h2>
         <div className="booking-card">
            <p>
               <strong>Specialty:</strong> {selectedSpecialty}
            </p>
            <p>
               <strong>Doctor:</strong> {selectedDoctor?.name}
            </p>
            <p>
               <strong>Time:</strong> {selectedTime}
            </p>
         </div>
         <button className="action-btn" onClick={handleConfirm}>
            Confirm Appointment
         </button>
      </div>
   );
});
