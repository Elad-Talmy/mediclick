import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { searchDoctors } from '../../services/doctors';
import { Doctor } from '../../types';
import './SearchBar.less';

export const DoctorSearchBar = ({
   onResults,
}: {
   onResults: (doctors: Doctor[]) => void;
}) => {
   const [query, setQuery] = useState('');

   const handleSearch = debounce(async (value: string) => {
      if (value.length < 2) return;
      const res = await searchDoctors(value);
      onResults(res);
   }, 300);

   useEffect(() => {
      handleSearch(query);
   }, [query]);

   return (
      <input
         className="search-input"
         type="text"
         placeholder="Search doctor or specialty"
         value={query}
         onChange={(e) => setQuery(e.target.value)}
      />
   );
};
