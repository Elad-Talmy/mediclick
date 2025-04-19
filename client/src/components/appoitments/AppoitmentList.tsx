import { memo, useMemo, useState } from 'react';
import { Appointment } from '../../types';
import { RotateCcw, X, StickyNote } from 'lucide-react'; // ⬅️ notes icon
import { formatTime } from '../../utils';
import './AppoitmentList.less';

type Props = {
   title: string;
   appointments: Appointment[];
   onCancel?: (id: string) => void;
   onReschedule?: (appt: Appointment) => void;
};

export const AppointmentList = memo(
   ({ title, appointments, onCancel, onReschedule }: Props) => {
      const [activeNote, setActiveNote] = useState<string | null>(null);
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
                  <li key={appt._id} className="appt-card">
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

                     <div className="appt-card-right">
                        {appt.notes && (
                           <button
                              onClick={() => setActiveNote(appt.notes!)}
                              className="appt-icon-btn note"
                              title="View Notes"
                           >
                              <StickyNote size={18} />
                           </button>
                        )}
                        {showButtons && (
                           <>
                              <button
                                 onClick={() => onCancel?.(appt._id)}
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
                           </>
                        )}
                     </div>
                  </li>
               ))}
            </ul>

            {/* 💬 Note Popup */}
            {activeNote && (
               <div
                  className="note-popup-overlay"
                  onClick={() => setActiveNote(null)}
               >
                  <div
                     className="note-popup"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <h4>Doctor Notes</h4>
                     <p>{activeNote}</p>
                     <button
                        className="close-btn"
                        onClick={() => setActiveNote(null)}
                     >
                        Close
                     </button>
                  </div>
               </div>
            )}
         </div>
      );
   }
);
