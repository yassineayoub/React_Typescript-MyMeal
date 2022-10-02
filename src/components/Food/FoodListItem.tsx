import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, ListItem, Stack } from '@chakra-ui/react';
import React from 'react';
import { FoodItem, Meal } from '../../reducers/mealReducer';

type FoodListItemProps = {
  foodItem: FoodItem;
  mealIndex: number,
  meals: Meal[]
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
      // boxShadow={
      //   'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
      // }
      boxShadow={isCheckedFood(mealIndex, foodName, id) ? 'outline' : 'md'}
      rounded="lg"
      marginBottom={3}
    >
      <Box flex={1}>
        <Badge
          colorScheme={
            isCheckedFood(mealIndex, foodName, id) ? 'blue' : 'blackAlpha'
          }
          variant="subtle"
          w={'100%'}
          padding="1.5"
          position="relative"
          marginBottom="5px"
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
