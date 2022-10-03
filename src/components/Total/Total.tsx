import { Box, Button, Divider, Input, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FoodCard from '../Food/FoodCard';
import FoodMealName from '../Food/FoodMealName';
import { FoodItem, setUpdatedFoodItem } from '../../reducers/mealReducer';

const Total = () => {
  const { meals, myMeal } = useAppSelector((state) => state.meal);
  const dispatch = useAppDispatch();
  const [myMeals, setUpdatedMeals] = useState(meals);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setUpdatedMeals(myMeal);
  }, [myMeal]);

  const handleSetAmount = (
    amount: number,
    mealIndex: number,
    foodItem: FoodItem
  ) => {
    if (amount > 0) {
      const updatedItem = { ...foodItem };
      console.log(foodItem.serving);
      // TODO revoir l'input value
      updatedItem.carbs = amount * (updatedItem.carbs / updatedItem.serving);
      updatedItem.fat = amount * (updatedItem.fat / updatedItem.serving);
      updatedItem.protein =
        amount * (updatedItem.protein / updatedItem.serving);
      updatedItem.serving = amount;
      setAmount(amount);
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
          {food.map((foodItem) => (
            <Stack key={foodItem.id} direction="row">
              <FoodCard foodItem={foodItem} mealIndex={index} />
              <Input
                type="number"
                value={foodItem.serving}
                onChange={(e) =>
                  handleSetAmount(+e.target.value, index, foodItem)
                }
              />
            </Stack>
          ))}
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default Total;
