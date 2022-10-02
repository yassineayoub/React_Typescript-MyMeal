import PropTypes from 'prop-types';
import { Badge, Box, List, ListIcon, ListItem, Stack } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import {
  FoodItem,
  insertToFoodItemToMeal,
  Meal,
  setFoodItems,
} from '../../reducers/mealReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { m } from 'framer-motion';
import { useParams } from 'react-router-dom';

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

const FoodList = () => {
  const [foodList, setFoodList] = useState<FoodItem[]>(food);
  const [mealIndex, setMealIndex] = useState<number>(0);
  const { searchValue, foodItems, meals } = useAppSelector(
    (state) => state.meal
  );
  const dispatch = useAppDispatch();
  const params = useParams();
  const { mealId } = params;
  
  useEffect(() => {
    if (mealId) {
      setMealIndex(+mealId)
    }
  } , [])


  const isCheckedFood = (mealIndex: number, foodName: string, id: number) => {
    const value = meals[mealIndex].food.findIndex(
      (meal) => meal.foodName === foodName && meal.id === id
    );
    // If -1, means there is a meal where the food doesn't exist
    if (value === -1) {
      return false;
    }
    return true;
  };

  const handleChecked = (id: number) => {
    const foodArray = [...foodList];
    const foodIndex = foodArray.findIndex((foodItem) => foodItem.id === id);
    foodArray[foodIndex] = {
      ...foodArray[foodIndex],
      checked: !foodArray[foodIndex].checked,
    };
    setFoodList(foodArray);
    if (mealId) {
      dispatch(
        insertToFoodItemToMeal({
          mealId: +mealId,
          foodItem: foodArray[foodIndex],
        })
      );
    }
  };

  useEffect(() => {
    const foodItems = foodList.filter((foodItem) => foodItem.checked === true);
    dispatch(setFoodItems(foodItems));
  }, [foodList]);

  // console.log(foodList);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFoodList(food.filter((item) => item.foodName.includes(searchValue)));
    }, 100);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <List>
      {foodList.map(
        (
          {
            foodName,
            protein,
            carbs,
            fat,
            id,
            checked,
            serving,
            unit,
          }: FoodItem,
          index: number
        ) => (
          <ListItem
            flexDirection="row"
            alignItems="center"
            display="flex"
            padding={2}
            cursor="pointer"
            boxShadow={
              'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
            }
            marginBottom={3}
            key={index}
            onClick={() => handleChecked(id)}
          >
            <ListIcon
              as={
                isCheckedFood(mealIndex, foodName, id)
                  ? MinusIcon
                  : AddIcon
              }
              w={6}
              h={6}
              color={isCheckedFood(mealIndex, foodName, id) ? "red.500" : "green.500"}
            />
            <Box flex={1}>
              <Badge
                colorScheme={
                  
                    isCheckedFood(mealIndex, foodName, id)
                    ? 'blue'
                    : 'blackAlpha'
                }
                variant="subtle"
                w={'100%'}
                padding="1.5"
                position="relative"
              >
                <Stack
                  textAlign="center"
                  display="flex"
                  direction="row"
                  justifyContent="center"
                  spacing={10}
                >
                  <Box display="flex">{foodName}</Box>
                  <Box
                    sx={{ position: 'absolute', right: '3%' }}
                  >{`/${serving}${unit}`}</Box>
                </Stack>
              </Badge>
              <Stack direction="row" justifyContent="space-between">
                <Badge
                  padding={0.5}
                  alignItems="center"
                  variant="solid"
                  colorScheme="telegram"
                >
                  Proteines: {protein}
                </Badge>
                <Badge variant="solid" colorScheme="orange">
                  Glucides: {carbs}
                </Badge>
                <Badge variant="solid" colorScheme="red">
                  Lipide: {fat}
                </Badge>
              </Stack>
            </Box>
          </ListItem>
        )
      )}
    </List>
  );
};

export default FoodList;
