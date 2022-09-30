import { Box, Button, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react';
import FoodList from './FoodList';
import FoodSearch from './FoodSearch';
import { CheckIcon } from '@chakra-ui/icons';

const food = [
  { foodName: 'noisette', protein: 10, fat: 30, carbs: 40, id: 1 },
  { foodName: 'amande', protein: 20, fat: 34, carbs: 35, id: 2 },
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
    <Box w={['90%', '60%', '40%']} margin="auto">
      <FoodSearch setSearch={setSearch} search={search} />
      <FoodList food={food} search={search} />
        <Button
          as={RouterLink}
          to={'/'}
          type="submit"
          colorScheme="green"
          margin={5}
          rightIcon={<CheckIcon />}
        >
          Prev
        </Button>
    </Box>
  );
};

export default Food;
