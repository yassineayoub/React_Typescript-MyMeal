import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Meal, setMealName } from '../../reducers/mealReducer';

type MealNameProps = {
  index: number;
};

const MealName = ({ index }: MealNameProps) => {
  const meals = useAppSelector((state) => state.meal.meals);
  const dispatch = useAppDispatch();
  console.log(typeof meals);
  return (
    <FormControl isRequired>
      <FormLabel htmlFor={`Repas ${index + 1}`}>Repas {index + 1}</FormLabel>
      <Input
        id={`Repas ${index + 1}`}
        placeholder="Entrez un nom"
        value={meals[index] ? meals[index].name : ''}
        onChange={(e) =>
          dispatch(
            setMealName({
              name: e.target.value,
              index: index,
              food: meals[index] ? meals[index].food : [],
            })
          )
        }
      />
    </FormControl>
  );
};

export default MealName;
