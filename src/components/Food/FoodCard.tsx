import { Badge, Box, Stack } from '@chakra-ui/react';
import React from 'react';
import { FoodItem } from '../../reducers/mealReducer';

type FoodCardProps = {
  foodItem: FoodItem;
  mealIndex: number;
  isCheckedFood?: (mealIndex: number, foodName: string, id: number) => boolean;
};

const FoodCard = ({
  foodItem: { id, foodName, carbs, fat, protein, serving, unit },
  isCheckedFood,
  mealIndex,
}: FoodCardProps) => {
  return (
    <Box flex={1}>
      <Badge
        colorScheme={
          isCheckedFood
            ? isCheckedFood(mealIndex, foodName, id)
              ? 'blue'
              : 'blackAlpha'
            : 'blackAlpha'
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
          Proteines<br/>
          {protein.toFixed(1) + ' ' + unit}
        </Badge>
        <Badge variant="solid" colorScheme="orange">
          Glucides<br/>
          {carbs.toFixed(1) + ' ' + unit}
        </Badge>
        <Badge variant="solid" colorScheme="red">
          Lipide<br/>
          {fat.toFixed(1) + ' ' + unit}
        </Badge>
      </Stack>
    </Box>
  );
};

export default FoodCard;
