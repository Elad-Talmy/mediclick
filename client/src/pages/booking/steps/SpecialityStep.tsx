import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setSpecialty } from '../../../store';
import { MedicalField } from '../../../types';

export const SpecialtyStep = () => {
   const dispatch = useAppDispatch();
   const fields = useAppSelector((state) => state.medical.fields);

   const handleSelect = (id: string) => {
      dispatch(setSpecialty(id));
   };

   return (
      <>
         <h2>Select a Medical Specialty</h2>
         <ul className="booking-list">
            {fields.map((field: MedicalField) => (
               <li
                  key={field.id}
                  className="booking-card"
                  onClick={() => handleSelect(field.id)}
               >
                  <strong>{field.name}</strong> — {field.description}
               </li>
            ))}
         </ul>
      </>
   );
};
