import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setDoctor } from '../../../store';
import { Doctor } from '../../../types';
import { useToast } from '../../../hooks';
import { getDoctorsBySpecialty } from '../../../services/doctors';

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
      getDoctorsBySpecialty(selectedSpecialty)
         .then((doctors) => {
            setDoctors(doctors);
            setLoading(false);
         })
         .catch(() => toast.error('Could not load specialities. Try again.'))
         .finally(() => setLoading(false));
   }, [selectedSpecialty]);

   const handleSelect = useCallback(
      (doctor: Doctor) => dispatch(setDoctor(doctor)),
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
                  key={doc._id}
                  className="booking-card"
                  onClick={() => handleSelect(doc)}
               >
                  <strong>{doc.name}</strong> — {doc.specialty}
               </li>
            ))}
         </ul>
      </>
   );
};
