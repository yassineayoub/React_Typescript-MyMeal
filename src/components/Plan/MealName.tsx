import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Meal, setMealName } from '../../reducers/mealReducer';
import { PlusSquareIcon } from '@chakra-ui/icons';

type MealNameProps = {
  index: number;
};

const MealName = ({ index }: MealNameProps) => {
  const [mealInputName, setMealInputName] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const meals = useAppSelector((state) => state.meal.meals);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsInvalid(mealInputName.trim() === '');
  };
  useEffect(() => {
    if (meals[index]) {
      setMealInputName(meals[index].name);
    }
    if (mealInputName !== '') {
      setIsInvalid(mealInputName.trim() === '');
    }
  }, [meals, mealInputName]);

  const handleSetMealName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealInputName(e.target.value);
    dispatch(
      setMealName({
        name: e.target.value,
        index: index,
        food: meals[index] ? meals[index].food : [],
      })
    );
  };
  console.log(isInvalid);
  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel htmlFor={`Repas ${index + 1}`}>Repas {index + 1}</FormLabel>
      <Input
        id={`Repas ${index + 1}`}
        placeholder="Entrez un nom"
        value={meals[index] ? meals[index].name : mealInputName}
        isInvalid={isInvalid}
        onChange={(e) => handleSetMealName(e)}
      />
      {isInvalid && <FormErrorMessage>Entrez un nom de repas</FormErrorMessage>}
      <Button
        to={!(mealInputName.trim() === '') ? `/meal/${index}` : ''}
        as={RouterLink}
        type="submit"
        colorScheme="orange"
        mt={2}
        rightIcon={<PlusSquareIcon h={10} w={10} />}
        onClick={handleClick}
      >
        Ajouter des aliments
      </Button>
    </FormControl>
  );
};

export default MealName;
