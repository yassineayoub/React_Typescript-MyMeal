import { Badge, Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import BadgeComponent from '../UI/BadgeComponent';

type SubTotalProps = {
  index: number;
};

const SubTotal = ({ index }: SubTotalProps) => {
  const { myMeal } = useAppSelector((state) => state.meal);
  const subtotal = myMeal.map((item) =>
    item.food.reduce(
      (arr, curr) => {
        arr.protein += curr.protein;
        arr.carbs += curr.carbs;
        arr.fat += curr.fat;
        return arr;
      },
      { protein: 0, carbs: 0, fat: 0 }
    )
  );

  return (
    <>
      <Text margin={5}>TOTAL</Text>
      <Stack
        justifyContent="space-around"
        direction="row"
        maxWidth="calc(100% - 70px)"
      >
        <BadgeComponent color="blue" data={subtotal[index].protein} />
        <BadgeComponent color="orange" data={subtotal[index].carbs} />
        <BadgeComponent color="red" data={subtotal[index].fat} />
      </Stack>
    </>
  );
};

export default SubTotal;
