import { memo, useMemo } from 'react';
import { Appointment } from '../../types';
import { RotateCcw, X } from 'lucide-react';
import './AppoitmentList.less';
import { formatTime } from '../../utils';

type Props = {
   title: string;
   appointments: Appointment[];
   onCancel?: (id: string) => void;
   onReschedule?: (appt: Appointment) => void;
};

export const AppointmentList = memo(
   ({ title, appointments, onCancel, onReschedule }: Props) => {
      const showButtons = useMemo(
         () => onCancel && onReschedule,
         [onCancel, onReschedule]
      );

      return (
         <div className="appt-list">
            <h3>{title}</h3>
            {!appointments?.length && <p>No appointments.</p>}

            <ul>
               {appointments?.map((appt) => (
                  <li key={appt.id} className="appt-card">
                     <div className="appt-card-left">
                        <div className="appt-time">{formatTime(appt.time)}</div>

                        <div className="appt-doctor-wrap">
                           <div className="appt-doctor-row">
                              {appt.doctor.pfp && (
                                 <img
                                    src={appt.doctor.pfp}
                                    alt={appt.doctor.name}
                                    className="appt-doctor-pfp"
                                 />
                              )}
                              <div className="appt-doctor">
                                 {appt.doctor.name}
                              </div>
                           </div>
                           <div className="appt-specialty">
                              <span className="appt-specialty-icon">🩺</span>
                              {appt.doctor.specialty}
                           </div>
                        </div>
                     </div>

                     {showButtons && (
                        <div className="appt-card-right">
                           <button
                              onClick={() => onCancel?.(appt.id)}
                              className="appt-icon-btn cancel"
                              title="Cancel"
                           >
                              <X size={18} />
                           </button>
                           <button
                              onClick={() => onReschedule?.(appt)}
                              className="appt-icon-btn resched"
                              title="Reschedule"
                           >
                              <RotateCcw size={18} />
                           </button>
                        </div>
                     )}
                  </li>
               ))}
            </ul>
         </div>
      );
   }
);
