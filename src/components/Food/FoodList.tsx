import {
  Badge,
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Stack,
} from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import {
  FoodItem,
  insertToFoodItemToMeal,
  setFoodItems,
} from '../../reducers/mealReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useParams } from 'react-router-dom';
import FoodListItem from './FoodListItem';

type FoodListProps = {
  food: FoodItem[];
  mealIndex: number;
};

const FoodList = ({ food, mealIndex }: FoodListProps) => {
  const [foodList, setFoodList] = useState(food);
  const { searchValue, meals } = useAppSelector((state) => state.meal);
  const dispatch = useAppDispatch();

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
    const foodItems = foodList.filter((foodItem) => foodItem.checked === true);
    dispatch(setFoodItems(foodItems));
  }, [foodList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFoodList(food.filter((item) => item.foodName.includes(searchValue)));
    }, 100);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <List>
      {searchValue &&
        foodList.map((foodItem: FoodItem, index: number) => (
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
            />
          </Stack>
        ))}
    </List>
  );
};

export default FoodList;
