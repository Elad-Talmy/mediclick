import { memo } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setSpecialty } from '../../../store';
import { MedicalField, RequestField } from '../../../types';

export const SpecialtyStep = memo(() => {
   const dispatch = useAppDispatch();
   const fields = useAppSelector((state) => state.medical.fields);

   const handleSelect = (speciality: RequestField) => {
      dispatch(setSpecialty(speciality));
   };

   return (
      <>
         <h2>Select a Medical Specialty</h2>
         <ul className="booking-list">
            {fields.map((field: MedicalField) => (
               <li
                  key={field.id}
                  className="booking-card"
                  onClick={() =>
                     handleSelect({ id: field.id, label: field.name })
                  }
               >
                  <strong>{field.name}</strong> — {field.description}
               </li>
            ))}
         </ul>
      </>
   );
});
