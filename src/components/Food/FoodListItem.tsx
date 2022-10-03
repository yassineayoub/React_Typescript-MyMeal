import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, ListItem, Stack } from '@chakra-ui/react';
import React from 'react';
import { FoodItem, Meal } from '../../reducers/mealReducer';
import FoodCard from './FoodCard';

type FoodListItemProps = {
  foodItem: FoodItem;
  mealIndex: number;
  meals: Meal[];
};

const FoodListItem = ({ foodItem, mealIndex, meals }: FoodListItemProps) => {
  const { id, foodName, protein, carbs, fat, serving, unit } = foodItem;

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
  return (
    <ListItem
      flexDirection="row"
      alignItems="center"
      display="flex"
      padding={2}
      flex={1}
      cursor="pointer"
      boxShadow={isCheckedFood(mealIndex, foodName, id) ? 'outline' : 'md'}
      rounded="lg"
      marginBottom={3}
    >
      <FoodCard
        foodItem={foodItem}
        mealIndex={mealIndex}
        isCheckedFood={isCheckedFood}
      />

      <Button
        marginLeft="6px"
        flexDirection="column"
        minWidth="80px"
        padding="8px"
        height="100%"
        leftIcon={
          isCheckedFood(mealIndex, foodName, id) ? <MinusIcon /> : <AddIcon />
        }
        color={isCheckedFood(mealIndex, foodName, id) ? 'red.500' : 'green.500'}
      >
        {isCheckedFood(mealIndex, foodName, id) ? 'Retirer' : 'Ajouter'}
      </Button>
    </ListItem>
  );
};

export default FoodListItem;
