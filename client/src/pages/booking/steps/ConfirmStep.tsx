import { v4 as uuid } from 'uuid';
import { memo, useCallback, useMemo, useState } from 'react';
import { clearBookingSession } from '../../../context/BookingStorage';
import { useAppDispatch, useAppSelector, useToast } from '../../../hooks';
import { bookAppointment } from '../../../services';
import { resetBooking } from '../../../store';
import { AppView, goToView } from '../../../store/slices/viewSlice';
import { format, parseISO } from 'date-fns';
import { removeAppointment } from '../../../store/slices/appoitmentSlice';
import { Input } from '../../../components';

export const ConfirmStep = memo(() => {
   const dispatch = useAppDispatch();
   const toast = useToast();
   const { selectedSpecialty, selectedDoctor, selectedTime, rescheduleId } =
      useAppSelector((state) => state.booking);

   const [notes, setNotes] = useState('');

   const specialty = useMemo(
      () => selectedSpecialty || selectedDoctor?.specialty,
      [selectedSpecialty, selectedDoctor]
   );

   const handleConfirm = useCallback(async () => {
      try {
         const response = await bookAppointment({
            _id: uuid(),
            specialty: specialty!,
            doctor: selectedDoctor!,
            time: selectedTime!,
            notes,
         });

         if (response.error) throw new Error(response.error);
         toast.success('Appointment confirmed!');

         if (rescheduleId) dispatch(removeAppointment(rescheduleId));
         clearBookingSession();
         dispatch(resetBooking());
         dispatch(goToView(AppView.Success));
      } catch (err: any) {
         toast.error(err.message || 'Booking failed.');
      }
   }, [
      specialty,
      selectedDoctor,
      selectedTime,
      notes,
      rescheduleId,
      dispatch,
      toast,
   ]);

   return (
      <div>
         <h2>Confirm Your Appointment</h2>
         <div className="booking-card">
            <p>
               <strong>Specialty:</strong> {specialty}
            </p>
            <p>
               <strong>Doctor:</strong> {selectedDoctor?.name}
            </p>
            <p>
               <strong>Time:</strong>{' '}
               {format(parseISO(selectedTime!), 'EEE, MMM d hh:mm')}
            </p>
            <Input
               className="notes-input"
               label="Additional Notes"
               placeholder="Add any notes for the doctor..."
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
            />
         </div>

         <button className="action-btn" onClick={handleConfirm}>
            Confirm Appointment
         </button>
      </div>
   );
});
