import { Button, FormControl } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useAppSelector } from '../../store/hooks';
import MealCounter from './MealCounter';
import MealName from './MealName';
import { useState } from 'react';


const Plan = () => {
  const mealCount = useAppSelector((state) => state.meal.mealCount);
  const rows = Array.from({ length: mealCount });

  return (
    <>
      <MealCounter />
      <form>
        <FormControl>
          {rows.map((v, index) => (
            <MealName key={index} index={index} />
          ))}
          <Button type="submit" colorScheme="green" margin={5} rightIcon={<CheckIcon />}>
            Valider
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export default Plan;
