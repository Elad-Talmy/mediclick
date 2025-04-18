import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setDoctor } from '../../../store';
import { Doctor } from '../../../types';
import { useToast } from '../../../hooks';
import { getDoctorsBySpecialty } from '../../../services/doctors';
import { useWaitingList } from '../../../hooks/useWaitingList';
import { Bell, BellOff } from 'lucide-react';

export const DoctorStep = () => {
   const toast = useToast();
   const dispatch = useAppDispatch();
   const selectedSpecialty = useAppSelector(
      (state) => state.booking.selectedSpecialty
   );
   const { subscribe, unsubscribe, isSubscribed } = useWaitingList();
   const [doctors, setDoctors] = useState<Doctor[]>([]);
   const [loading, setLoading] = useState(true);

   const handleToggle = useCallback((doctor: Doctor) => {
      const { _id } = doctor;
      isSubscribed(_id) ? unsubscribe(_id) : subscribe(_id);
   }, []);

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
                  <button
                     onClick={() => handleToggle(doc)}
                     className="bell-toggle"
                  >
                     {isSubscribed(doc._id) ? (
                        <BellOff size={20} />
                     ) : (
                        <Bell size={20} />
                     )}
                  </button>
               </li>
            ))}
         </ul>
      </>
   );
};
