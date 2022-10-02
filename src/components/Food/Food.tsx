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
import {
  FoodItem,
  insertFoodItemsToMeal,
  insertToFoodItemToMeal,
} from '../../reducers/mealReducer';
import FoodMealName from './FoodMealName';
import FoodListItem from './FoodListItem';

export type CheckedMeal = {
  checkedMeal: object[];
};

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

const Food = () => {
  const [mealName, setMealName] = useState('');

  const [foodList, setFoodList] = useState<FoodItem[]>(food);
  const [mealIndex, setMealIndex] = useState<number>(0);
  const { searchValue, meals } = useAppSelector((state) => state.meal);
  const dispatch = useAppDispatch();
  const params = useParams();
  const { mealId } = params;

  const handleChecked = (id: number) => {
    const foodArray = [...foodList];
    const foodIndex = foodArray.findIndex((foodItem) => foodItem.id === id);
    foodArray[foodIndex] = {
      ...foodArray[foodIndex],
      checked: !foodArray[foodIndex].checked,
    };
    setFoodList(foodArray);
    dispatch(
      insertToFoodItemToMeal({
        mealIndex: mealIndex,
        foodItem: foodArray[foodIndex],
      })
    );
  };

  useEffect(() => {
    if (mealId) {
      setMealIndex(+mealId);
    }
  }, []);

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
      <FoodList food={food} mealIndex={mealIndex} />
      <Text>Mes aliments selectionnées :</Text>
      <List>
        {mealId
          ? meals[mealIndex].food.map((foodItem, index) => (
              <Stack
                direction="row"
                key={index}
                alignItems="center"
                onClick={() => handleChecked(foodItem.id)}
              >
                <FoodListItem
                  meals={meals}
                  foodItem={foodItem}
                  mealIndex={mealIndex}
                  key={mealIndex}
                />
              </Stack>
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
