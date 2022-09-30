import { Box, Button, FormControl, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react';
import FoodList from './FoodList';
import FoodSearch from './FoodSearch';
import { CheckIcon } from '@chakra-ui/icons';
import FoodCheckBox from './FoodCheckBox';
import { Form } from 'formik';

const food = [
  {
    foodName: 'noisette',
    protein: 10,
    fat: 30,
    carbs: 40,
    id: 1,
    serving: 100,
    unit: 'g',
  },
  {
    foodName: 'amande',
    protein: 20,
    fat: 34,
    carbs: 35,
    id: 2,
    serving: 100,
    unit: 'g',
  },
  {
    foodName: 'amande',
    protein: 20,
    fat: 34,
    carbs: 35,
    id: 3,
    serving: 100,
    unit: 'g',
  },
  {
    foodName: 'choux',
    protein: 20,
    fat: 34,
    carbs: 35,
    id: 4,
    serving: 100,
    unit: 'g',
  },
];

export type CheckedMeal = {
  checkedMeal: object[]
}

const Food = () => {
  const [search, setSearch] = useState('');
  const handleAddFood = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e)
  }
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
      <FoodSearch setSearch={setSearch} search={search} />
      <FoodList food={food} search={search} />
      <form onSubmit={(e) => handleAddFood(e)}>
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
