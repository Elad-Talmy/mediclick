import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector, useToast } from '../../../hooks';
import { setTime } from '../../../store';
import { format, isSameDay, parseISO } from 'date-fns';
import './TimeStep.less';

export const TimeStep = () => {
   const dispatch = useAppDispatch();
   const toast = useToast();
   const doctor = useAppSelector((state) => state.booking.selectedDoctor);

   const [slotStrings, setSlotStrings] = useState<string[]>([]);
   const [selectedDay, setSelectedDay] = useState<string>();
   const [loading, setLoading] = useState(false);

   // Fetch slots from server
   useEffect(() => {
      if (!doctor) return;

      setLoading(true);
      setSlotStrings(doctor.availableSlots);
      setLoading(false);
   }, [doctor]);

   // Extract unique days (yyyy-MM-dd) from slot strings
   const days = useMemo(() => {
      const uniqueDays = new Set<string>();
      slotStrings.forEach((slot) => {
         const day = format(parseISO(slot), 'yyyy-MM-dd');
         uniqueDays.add(day);
      });
      return Array.from(uniqueDays).sort();
   }, [slotStrings]);

   // Filter time slots for selected day
   const filteredSlots = useMemo(() => {
      if (!selectedDay) return [];
      return slotStrings.filter(
         (slot) => format(parseISO(slot), 'yyyy-MM-dd') === selectedDay
      );
   }, [slotStrings, selectedDay]);

   const handleSelect = useCallback(
      (slot: string) => {
         dispatch(setTime(slot)); // ISO string
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
