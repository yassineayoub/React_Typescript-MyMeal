import PropTypes from 'prop-types';
import { Badge, Box, List, ListIcon, ListItem, Stack } from '@chakra-ui/react';
import { CheckIcon, SmallAddIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { FoodItem, Meal, setFoodItems } from '../../reducers/mealReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { m } from 'framer-motion';

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
  const { searchValue, foodItems, meals } = useAppSelector(
    (state) => state.meal
  );
  const dispatch = useAppDispatch();
 
  const checkedMeals = meals.filter((meal) => meal.checked === true);
  console.log(checkedMeals);

  const isCheckedFood = (
    checkedMeals: Meal[],
    foodName: string,
    id: number
  ) => {
    const value = checkedMeals.map((meal) =>
      meal.food.findIndex(
        (foodItem) => foodItem.foodName === foodName && foodItem.id === id
      )
    );
    // If -1, means there is a meal where the food doesn't exist
    if (value.includes(-1) || checkedMeals.length === 0) {
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
  };

  // console.log(foodItems)
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
                (
                  isCheckedFood(checkedMeals, foodName, id) && checked
                )
                  ? CheckIcon
                  : SmallAddIcon
              }
              w={6}
              h={6}
              color="green.700"
            />
            <Box flex={1}>
              <Badge
                colorScheme={
                  (
                    isCheckedFood(checkedMeals, foodName, id)
                      ? isCheckedFood(checkedMeals, foodName, id)
                      : checked
                  )
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
