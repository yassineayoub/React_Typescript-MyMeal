import { Badge } from '@chakra-ui/react';
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
    <div>
      <BadgeComponent
        name="proteines"
        color="blue"
        data={subtotal[index].protein}
      />
      <BadgeComponent
        name="glucides"
        color="orange"
        data={subtotal[index].carbs}
      />
      <BadgeComponent
        name="lipides"
        color="red"
        data={subtotal[index].fat}
      />
    </div>
  );
};

export default SubTotal;
