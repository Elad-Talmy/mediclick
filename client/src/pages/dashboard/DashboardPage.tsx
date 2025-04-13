import { useEffect, useState } from 'react';
import { AppointmentList, MedicalFieldList } from '../../components';
import { getAppointments, getMedicalFields, getUser } from '../../services';
import './DashboardPage.less';

type MedicalField = {
   id: string;
   name: string;
   description: string;
};

type Appointment = {
   id: string;
   date: string;
   doctor: string;
   field: string;
};

export function DashboardPage() {
   const [isLoading, setIsLoading] = useState(true);
   const [isNewUser, setIsNewUser] = useState(false);
   const [userName, setUserName] = useState('');
   const [fields, setFields] = useState<MedicalField[]>([]);
   const [appointments, setAppointments] = useState<{
      upcoming: Appointment[];
      past: Appointment[];
   }>({ upcoming: [], past: [] });

   useEffect(() => {
      const loadData = async () => {
         setIsLoading(true);
         const user = await getUser();
         setIsNewUser(user.isNew);
         setUserName(user.name);
         const fieldData = await getMedicalFields();
         setFields(fieldData);
         if (!user.isNew) {
            const appts = await getAppointments();
            setAppointments(appts);
         }
         setIsLoading(false);
      };
      loadData();
   }, []);

   if (isLoading) return <div className="dashboard-container">Loading...</div>;

   return (
      <div className="dashboard-container">
         <h2 className="dashboard-header">Hello, {userName} 👋</h2>

         {isNewUser ? (
            <>
               <p>Welcome to Mediclick! Let's get you started:</p>
               <MedicalFieldList fields={fields} />
               <button
                  className="action-btn"
                  onClick={() => (window.location.href = '/book')}
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
                  onClick={() => (window.location.href = '/book')}
               >
                  Book New Appointment
               </button>
            </>
         )}
      </div>
   );
}
