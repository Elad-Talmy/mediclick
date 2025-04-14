import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setTime } from '../../../store';
import { DAYS, getAvailableSlotsByDay } from '../../../services/slots';
import './TimeStep.less';

export const TimeStep = () => {
   const dispatch = useAppDispatch();
   const doctor = useAppSelector((state) => state.booking.selectedDoctor);

   const [selectedDay, setSelectedDay] = useState(DAYS[0]);
   const [slots, setSlots] = useState<string[]>([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (!doctor || !selectedDay) return;
      setLoading(true);

      getAvailableSlotsByDay(doctor.id!, selectedDay).then((res) => {
         setSlots(res);
         setLoading(false);
      });
   }, [doctor?.id, selectedDay]);

   const handleSelect = (slot: string) => {
      dispatch(setTime({ label: `${selectedDay} ${slot}` }));
   };

   return (
      <div className="calendar-container">
         <h2>Choose a Time Slot</h2>

         <div className="day-selector">
            {DAYS.map((day) => (
               <button
                  key={day}
                  className={`day-btn ${day === selectedDay ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day)}
               >
                  {new Date(day).toLocaleDateString('en-GB', {
                     weekday: 'short',
                     day: 'numeric',
                     month: 'short',
                  })}
               </button>
            ))}
         </div>

         {loading ? (
            <p>Loading slots...</p>
         ) : (
            <div className="slot-grid">
               {slots.map((slot) => (
                  <button
                     key={slot}
                     className="slot"
                     onClick={() => handleSelect(slot)}
                  >
                     {slot}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
};
