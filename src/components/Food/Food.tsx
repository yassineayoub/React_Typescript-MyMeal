import React, { useState } from 'react';
import FoodList from './FoodList';
import FoodSearch from './FoodSearch';

const food = [
  { foodName: 'noisette', protein: 10, fat: 30, carbs: 40 },
  { foodName: 'amande', protein: 20, fat: 34, carbs: 35 },
];
// type FoodItem = {
//   foodName: string;
//   protein: number;
//   carbs: number;
//   fat: number;
// };

// type Food = {
//   items: FoodItem[]
// }

const Food = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <FoodSearch setSearch={setSearch} search={search} />
      <FoodList food={food} search={search} />
    </>
  );
};

export default Food;
