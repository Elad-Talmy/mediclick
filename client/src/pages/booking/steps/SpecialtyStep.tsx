import { memo, useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setSpecialty } from '../../../store';

export const SpecialtyStep = memo(() => {
   const dispatch = useAppDispatch();
   const fields = useAppSelector((state) => state.medical.fields);

   const handleSelect = useCallback(
      (specialty: string) => {
         dispatch(setSpecialty(specialty));
      },
      [dispatch]
   );

   return (
      <>
         <h2>Select a Medical Specialty</h2>
         <ul className="booking-list">
            {fields.map((field: string) => (
               <li
                  key={field}
                  className="booking-card"
                  onClick={() => handleSelect(field)}
               >
                  <strong>{field}</strong>
               </li>
            ))}
         </ul>
      </>
   );
});
