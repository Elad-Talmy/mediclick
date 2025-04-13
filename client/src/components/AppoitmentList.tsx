type Appointment = {
   id: string;
   date: string;
   doctor: string;
   field: string;
};

type Props = {
   title: string;
   appointments: Appointment[];
};

export const AppointmentList = ({ title, appointments }: Props) => {
   if (!appointments.length) return null;

   return (
      <>
         <h3 className="section-title">{title}</h3>
         <ul className="appointment-list">
            {appointments.map((appt) => (
               <li key={appt.id} className="appointment-item">
                  <strong>{appt.date}</strong> with <em>{appt.doctor}</em> (
                  {appt.field})
               </li>
            ))}
         </ul>
      </>
   );
};
