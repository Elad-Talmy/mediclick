import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector, useToast } from '../../../hooks';
import { setTime } from '../../../store';
import { format, parseISO } from 'date-fns';
import './TimeStep.less';

export const TimeStep = () => {
   const dispatch = useAppDispatch();
   const toast = useToast();
   const doctor = useAppSelector((state) => state.booking.selectedDoctor);

   const [slotStrings, setSlotStrings] = useState<string[]>([]);
   const [selectedDay, setSelectedDay] = useState<string>();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (!doctor) return;

      setLoading(true);
      setSlotStrings(doctor.availableSlots);
      setLoading(false);
   }, [doctor]);

   const days = useMemo(() => {
      const uniqueDays = new Set(
         slotStrings.map((iso) => format(parseISO(iso), 'yyyy-MM-dd'))
      );
      return Array.from(uniqueDays).sort();
   }, [slotStrings]);

   const filteredSlots = useMemo(() => {
      if (!selectedDay) return [];
      return slotStrings.filter(
         (iso) => format(parseISO(iso), 'yyyy-MM-dd') === selectedDay
      );
   }, [slotStrings, selectedDay]);

   const handleSelect = useCallback(
      (slot: string) => {
         dispatch(setTime(slot));
      },
      [dispatch]
   );

   return (
      <div className="calendar-container">
         <h2>Choose a Time Slot</h2>

         <div className="day-selector">
            {days.map((day) => (
               <button
                  key={day}
                  className={`day-btn ${day === selectedDay ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day)}
               >
                  {format(parseISO(day), 'EEE, MMM d')}
               </button>
            ))}
         </div>

         {loading ? (
            <p>Loading slots...</p>
         ) : (
            <div className="slot-grid">
               {filteredSlots.map((slot) => (
                  <button
                     key={slot}
                     className="slot"
                     onClick={() => handleSelect(slot)}
                  >
                     {format(parseISO(slot), 'HH:mm')}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
};
