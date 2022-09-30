import { Box, Button, FormControl, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react';
import FoodList from './FoodList';
import FoodSearch from './FoodSearch';
import { CheckIcon } from '@chakra-ui/icons';
import FoodCheckBox from './FoodCheckBox';
import { useAppDispatch } from '../../store/hooks';
import { insertFoodItemsToMeal } from '../../reducers/mealReducer';

export type CheckedMeal = {
  checkedMeal: object[];
};

const Food = () => {
  const dispatch = useAppDispatch();
  const handleDispatchSetFoodItems = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(insertFoodItemsToMeal())
    console.log("c'est ajouté boy")
  };
  return (
    <Box
      w={['90%', '60%', '40%']}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="auto"
      textAlign="center"
      gap={5}
    >
      <FoodSearch />
      <FoodList />
      <form onSubmit={(e) => handleDispatchSetFoodItems(e)}>
        <FormControl>
          <FoodCheckBox />
          <Button
            type="submit"
            colorScheme="blue"
            marginTop={5}
            rightIcon={<CheckIcon />}
          >
            Ajouter
          </Button>
        </FormControl>
      </form>
      <Stack margin="auto">
        <Button
          as={RouterLink}
          to={'/'}
          type="submit"
          colorScheme="green"
          marginTop={5}
          rightIcon={<CheckIcon />}
        >
          Précédent
        </Button>
        <Button
          as={RouterLink}
          to={'/'}
          type="submit"
          colorScheme="green"
          marginTop={5}
          rightIcon={<CheckIcon />}
        >
          Suivant
        </Button>
      </Stack>
    </Box>
  );
};

export default Food;
