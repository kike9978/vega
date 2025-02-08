import { useState } from 'react';

export const FILTER_SEX = {
  ALL: '',
  MALE: 'male',
  FEMALE: 'female'
};

export function useCowFilter(cows) {
  const [filterText, setFilterText] = useState("");

  const filteredCows = cows
    .filter(cow => cow.name.toLowerCase().includes(filterText.toLowerCase()));

  return {
    filterText,
    setFilterText,
    filteredCows
  };
} 