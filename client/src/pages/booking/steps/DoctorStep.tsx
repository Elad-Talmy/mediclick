import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setDoctor } from '../../../store';
import { getDoctorsByField } from '../../../services/doctors';
import { Doctor, RequestField } from '../../../types';
import { useToast } from '../../../hooks';

export const DoctorStep = () => {
   const toast = useToast();
   const dispatch = useAppDispatch();
   const selectedSpecialty = useAppSelector(
      (state) => state.booking.selectedSpecialty
   );
   const [doctors, setDoctors] = useState<Doctor[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!selectedSpecialty) return;

      setLoading(true);
      getDoctorsByField(selectedSpecialty)
         .then((doctors) => {
            setDoctors(doctors);
            setLoading(false);
         })
         .catch(() => toast.error('Could not load specialities. Try again.'))
         .finally(() => setLoading(false));
   }, [selectedSpecialty]);

   const handleSelect = useCallback(
      (doctor: RequestField) => dispatch(setDoctor(doctor)),
      [dispatch]
   );

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
                  onClick={() => handleSelect({ id: doc.id, label: doc.name })}
               >
                  <strong>{doc.name}</strong> — {doc.bio}
               </li>
            ))}
         </ul>
      </>
   );
};
