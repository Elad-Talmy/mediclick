import { memo, useCallback, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setSpecialty, setDoctor, goToStep } from '../../../store';
import { BookingStep, Doctor } from '../../../types';
import { DoctorSearchBar } from '../../../components/search/SearchBar';
import './SpecialtyStep.less';

export const SpecialtyStep = memo(() => {
   const dispatch = useAppDispatch();
   const fields = useAppSelector((state) => state.medical.fields);

   const [searchResults, setSearchResults] = useState<Doctor[]>([]);
   const [showResults, setShowResults] = useState(false);

   const handleSelectSpecialty = useCallback(
      (specialty: string) => {
         dispatch(setSpecialty(specialty));
      },
      [dispatch]
   );

   const handleSelectDoctor = useCallback(
      (doctor: Doctor) => {
         dispatch(setDoctor(doctor));
         dispatch(setSpecialty(doctor.specialty));
         dispatch(goToStep(BookingStep.Time));
      },
      [dispatch]
   );

   const handleSearchResults = (doctors: any[]) => {
      setSearchResults(doctors);
      setShowResults(true);
   };

   return (
      <div className="specialty-step">
         <h2>Select a Medical Specialty</h2>

         <DoctorSearchBar onResults={handleSearchResults} />

         {showResults && searchResults?.length > 0 && (
            <ul className="booking-list results-list">
               {searchResults.map((doc) => (
                  <li
                     key={doc._id}
                     className="booking-card search-result"
                     onClick={() => handleSelectDoctor(doc)}
                  >
                     <strong>{doc.name}</strong>
                     <p>{doc.specialty}</p>
                  </li>
               ))}
            </ul>
         )}

         <ul className="booking-list">
            {fields.map((field: string) => (
               <li
                  key={field}
                  className="booking-card"
                  onClick={() => handleSelectSpecialty(field)}
               >
                  <strong>{field}</strong>
               </li>
            ))}
         </ul>
      </div>
   );
});
