import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Meal, setMealName } from '../../reducers/mealReducer';

type MealNameProps = {
  index: number;
  isSubmit: boolean;
};

const MealName = ({ index, isSubmit }: MealNameProps) => {
  const { meals } = useAppSelector((state) => state.meal);
  const dispatch = useAppDispatch();
  const [mealObj, setMealObj] = useState<Meal>({ name: '', index: index });
  useEffect(() => {
    if (isSubmit) {
      dispatch(setMealName(mealObj));
    }
  }, [isSubmit]);
  console.log(mealObj);

  return (
    <FormControl isRequired>
      <FormLabel htmlFor={`Repas ${index + 1}`}>Repas {index + 1}</FormLabel>
      <Input
        id={`Repas ${index + 1}`}
        placeholder="Entrez un nom"
        onChange={(e) => setMealObj({ name: e.target.value, index: index })}
      />
    </FormControl>
  );
};

export default MealName;
