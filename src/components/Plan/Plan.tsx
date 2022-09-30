import { Box, Button, FormControl, Stack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useAppSelector } from '../../store/hooks';
import { Link as RouterLink } from 'react-router-dom';
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
    <Box
      w={['90%', '60%', '40%']}
      display="flex"
      flexDirection="column"
      margin="auto"
      textAlign="center"
      gap={5}
    >
      <MealCounter />
      <form onSubmit={handleSubmitForm}>
        <FormControl>
          {rows.map((v, index) => (
            <MealName key={index} index={index} />
          ))}
      
            <Button
              to={'/food'}
              as={RouterLink}
              type="submit"
              colorScheme="green"
              margin={5}
              rightIcon={<CheckIcon />}
            >
              Suivant
            </Button>
       
        </FormControl>
      </form>
    </Box>
  );
};

export default Plan;
