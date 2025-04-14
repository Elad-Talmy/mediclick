import { useAppDispatch, useAppSelector, useToast } from '../../../hooks';
import { bookAppointment } from '../../../services';
import { resetBooking, showToast } from '../../../store';
import { AppView, goToView } from '../../../store/slices/viewSlice';

export const ConfirmStep = () => {
   const dispatch = useAppDispatch();
   const toast = useToast();
   const { selectedSpecialty, selectedDoctor, selectedTime } = useAppSelector(
      (state) => state.booking
   );

   const handleConfirm = async () => {
      await bookAppointment({
         specialty: selectedSpecialty!,
         doctor: selectedDoctor!,
         time: selectedTime!,
      });

      toast.success('Appointment confirmed!');

      //Add error toast when backend ready

      dispatch(resetBooking());
      dispatch(goToView(AppView.Success));
   };

   return (
      <div>
         <h2>Confirm Your Appointment</h2>
         <div className="booking-card">
            <p>
               <strong>Specialty:</strong> {selectedSpecialty?.label}
            </p>
            <p>
               <strong>Doctor:</strong> {selectedDoctor?.label}
            </p>
            <p>
               <strong>Time:</strong> {selectedTime?.label}
            </p>
         </div>
         <button className="action-btn" onClick={handleConfirm}>
            Confirm Appointment
         </button>
      </div>
   );
};
