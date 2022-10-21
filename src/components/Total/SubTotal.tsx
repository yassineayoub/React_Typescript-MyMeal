import React from 'react';
import { useAppSelector } from '../../store/hooks';


const SubTotal = () => {
  const { myMeal } = useAppSelector((state) => state.meal);

  const test = myMeal.map((item) => item.food.reduce((arr, curr ) => {
    arr.protein += curr.protein
    arr.carbs += curr.carbs
    arr.fat += curr.fat
    return arr;
  } ,{ protein: 0, carbs: 0, fat: 0 }))
  console.log(test, 'test')
  return (
  <div>SubTotal</div>
  
  );
};

export default SubTotal;
