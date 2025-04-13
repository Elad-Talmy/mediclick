import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setDoctor } from '../../../store';
import { getDoctorsByField } from '../../../services/doctors';
import { Doctor } from '../../../types';

export const DoctorStep = () => {
   const dispatch = useAppDispatch();
   const selectedSpecialty = useAppSelector(
      (state) => state.booking.selectedSpecialty
   );
   const [doctors, setDoctors] = useState<Doctor[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!selectedSpecialty) return;

      setLoading(true);
      getDoctorsByField(selectedSpecialty).then((doctors) => {
         setDoctors(doctors);
         setLoading(false);
      });
   }, [selectedSpecialty]);

   const handleSelect = (doctorId: string) => {
      dispatch(setDoctor(doctorId));
   };

   if (!selectedSpecialty) return <p>No specialty selected</p>;
   if (loading) return <p>Loading doctors...</p>;

   return (
      <>
         <h2>Select a Doctor</h2>
         <ul className="booking-list">
            {doctors.map((doc) => (
               <li
                  key={doc.id}
                  className="booking-card"
                  onClick={() => handleSelect(doc.id)}
               >
                  <strong>{doc.name}</strong> — {doc.bio}
               </li>
            ))}
         </ul>
      </>
   );
};
