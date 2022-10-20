import { Box, Button, Divider, Input, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FoodCard from '../Food/FoodCard';
import FoodMealName from '../Food/FoodMealName';
import { FoodItem, setUpdatedFoodItem } from '../../reducers/mealReducer';
import { current } from '@reduxjs/toolkit';

const Total = () => {
  const { meals, myMeal } = useAppSelector((state) => state.meal);
  const dispatch = useAppDispatch();
  const [myMeals, setUpdatedMeals] = useState(meals);
  const [amount, setAmount] = useState<string | null>();

  useEffect(() => {
    setUpdatedMeals(myMeal);
  }, [myMeal]);

  const handleSetAmount = (
    amount: number,
    mealIndex: number,
    foodItem: FoodItem
  ) => {
    setAmount(amount.toString());
    if (amount > 0) {
      const updatedItem = { ...foodItem };
      console.log(foodItem.serving);
      updatedItem.carbs = amount * (updatedItem.carbs / updatedItem.serving);
      updatedItem.fat = amount * (updatedItem.fat / updatedItem.serving);
      updatedItem.protein =
        amount * (updatedItem.protein / updatedItem.serving);
      updatedItem.serving = amount;
   
      // setUpdate()
      const updatedMeals = [...myMeals];
      const foodItemIndex = updatedMeals[mealIndex].food.findIndex(
        (item) => item.id === foodItem.id
      );
      console.log(updatedMeals);
      // dispatch(setMyMeal(updatedMeals));
      dispatch(
        setUpdatedFoodItem({
          mealIndex: mealIndex,
          updatedFoodItem: updatedItem,
          foodItemIndex: foodItemIndex,
        })
      );
    }
  };

  [
    { prot: 0,
      glu:0,
      fat: 0
    },

  ]
  type Empty = {
    prot: number,
    glu: number,
    fat: number,
  }
  // const array = [];
  // myMeal.forEach((meal) => meal.food.reduce(((initial: Empty, curr, next) => {
  //   initial.fat += next.protein
  // }, { prot: 0, glu: 0, fat: 0 })))
    

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
      {myMeals.map(({ food, name, index }) => (
        <>
          <FoodMealName key={name} name={name} />
          {food.map((foodItem) => { return (
            <Stack key={foodItem.id} direction="row">
              <FoodCard foodItem={foodItem} mealIndex={index} />
              <Input
              sx={{ width: '60px', padding: 1, textAlign: 'center' }}
                type="number"
                inputMode="numeric"
                value={amount 
                ? amount.replace(/^0+/,'') 
                : foodItem.serving.toString().replace(/^0+/,'')}
                onChange={(e) =>
                  handleSetAmount(+e.target.value, index, foodItem)
                }
              />
              
            </Stack>
            
          )})}
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default Total;
