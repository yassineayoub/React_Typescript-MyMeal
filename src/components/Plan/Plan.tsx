import { Box, Button, FormControl } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';
import MealCounter from './MealCounter';
import MealName from './MealName';
import React, { useEffect, useState } from 'react';

const Plan = () => {
  const mealCount = useAppSelector((state) => state.meal.mealCount);
  const [isSubmit, setIsSubmit] = useState(false);
  const rows = Array.from({ length: mealCount });
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
  };
  useEffect(() => {
    if (isSubmit) {
      setTimeout(() => {
        setIsSubmit(false);
      }, 1000);
    }
  }, [isSubmit]);

  return (
    <Box w={["90%","60%","40%"]}  margin="auto">
      <MealCounter />
      <form onSubmit={handleSubmitForm}>
        <FormControl >
          {rows.map((v, index) => (
            <MealName key={index} index={index} />
          ))}
          <Button
            type="submit"
            colorScheme="green"
            margin={5}
            rightIcon={<CheckIcon />}
          >
            Valider
          </Button>
        </FormControl>
      </form>
      <Link to={'/food'}>
        <Button
          type="submit"
          colorScheme="green"
          margin={5}
          rightIcon={<CheckIcon />}
        >
          Suivant
        </Button>
      </Link>
      </Box>
  );
};

export default Plan;
