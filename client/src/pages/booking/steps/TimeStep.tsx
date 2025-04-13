import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setTime } from '../../../store';
import { getAvailableSlots } from '../../../services/slots';

export const TimeStep = () => {
   const dispatch = useAppDispatch();
   const selectedDoctor = useAppSelector(
      (state) => state.booking.selectedDoctor
   );
   const [slots, setSlots] = useState<string[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!selectedDoctor) return;
      setLoading(true);
      getAvailableSlots(selectedDoctor).then((res) => {
         setSlots(res);
         setLoading(false);
      });
   }, [selectedDoctor]);

   const handleSelect = (slot: string) => {
      dispatch(setTime(slot));
   };

   if (!selectedDoctor) return <p>No doctor selected</p>;
   if (loading) return <p>Loading available slots...</p>;

   return (
      <>
         <h2>Choose a Time Slot</h2>
         <ul className="booking-list">
            {slots.map((slot, index) => (
               <li
                  key={index}
                  className="booking-card"
                  onClick={() => handleSelect(slot)}
               >
                  {slot}
               </li>
            ))}
         </ul>
      </>
   );
};
