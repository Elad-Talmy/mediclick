import { memo, useEffect } from 'react';
import { MedicalFieldList, AppointmentList } from '../../components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchUser } from '../../store/slices/userSlice';
import { fetchMedicalFields } from '../../store/slices/medicalSlice';
import { fetchAppointments } from '../../store/slices/appoitmentSlice';
import { AppView, goToView } from '../../store/slices/viewSlice';
import './DashboardPage.less';

export const DashboardPage = memo(() => {
   const dispatch = useAppDispatch();

   const user = useAppSelector((state) => state.user.data);
   const userStatus = useAppSelector((state) => state.user.status);
   const fields = useAppSelector((state) => state.medical.fields);
   const appointments = useAppSelector((state) => state.appointment.data);

   useEffect(() => {
      dispatch(fetchUser());
      dispatch(fetchMedicalFields());
      dispatch(fetchAppointments());
   }, [dispatch]);

   if (userStatus === 'loading' || !user) {
      return <div className="dashboard-container">Loading...</div>;
   }

   return (
      <div className="dashboard-container">
         <h2 className="dashboard-header">Hello, {user.name} 👋</h2>

         {user.isNew ? (
            <>
               <p>Welcome to Mediclick! Let's get you started:</p>
               <MedicalFieldList fields={fields} />
               <button
                  className="action-btn"
                  onClick={() => dispatch(goToView(AppView.Booking))}
               >
                  Start Booking
               </button>
            </>
         ) : (
            <>
               <AppointmentList
                  title="Upcoming Appointments"
                  appointments={appointments.upcoming}
               />
               <AppointmentList
                  title="Past Appointments"
                  appointments={appointments.past}
               />
               <button
                  className="action-btn"
                  onClick={() => dispatch(goToView(AppView.Booking))}
               >
                  Book New Appointment
               </button>
            </>
         )}
      </div>
   );
});
