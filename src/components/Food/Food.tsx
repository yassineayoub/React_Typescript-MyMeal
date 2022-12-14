import {
  Box,
  Button,
  FormControl,
  Link,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import FoodList from './FoodList';
import FoodSearch from './FoodSearch';
import { CheckIcon } from '@chakra-ui/icons';
import FoodCheckBox from './FoodCheckBox';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { insertFoodItemsToMeal } from '../../reducers/mealReducer';
import FoodMealName from './FoodMealName';

export type CheckedMeal = {
  checkedMeal: object[];
};

const Food = () => {
  const [mealName, setMealName] = useState('');
  const dispatch = useAppDispatch();
  const { meals, foodItems } = useAppSelector((state) => state.meal);
  const handleDispatchSetFoodItems = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(insertFoodItemsToMeal());
    console.log("c'est ajouté boy");
  };
  const { mealId } = useParams();

  useEffect(() => {
    if (mealId) {
      const mealIndex = +mealId;
      setMealName(meals[mealIndex].name);
    }
  }, [mealId]);

  return (
    <Box
      w={['95%', '60%', '40%']}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="auto"
      textAlign="center"
      gap={5}
    >
      <FoodMealName name={mealName} />
      <FoodSearch />
      <FoodList />
      <Text>Mes aliments selectionnées :</Text>
      <List>
        {mealId
          ? meals[+mealId].food.map((foodItem) => (
              <ListItem key={foodItem.id}>{foodItem.foodName}</ListItem>
            ))
          : ''}
      </List>
      <Stack margin="auto">
        <Button
          as={RouterLink}
          to={'/mymeal'}
          type="submit"
          colorScheme="blue"
          marginTop={5}
          rightIcon={<CheckIcon />}
        >
          Valider
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
