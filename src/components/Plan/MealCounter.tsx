import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { IconButton, Input, Stack, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { decrement, increment, incrementByAmount } from '../../reducers/mealReducer';

const MealCounter = () => {
  const mealCount = useAppSelector((state) => state.meal.mealCount);
  const dispatch = useAppDispatch();
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Text>Nombre de repas par jour</Text>
      <label htmlFor="mealCount">
        <Input
          type="number"
          id="mealCount"
          width={50}
          value={mealCount}
          onChange={(e) => dispatch(incrementByAmount(parseInt(e.target.value)))}
        />
      </label>
      <IconButton
        aria-label="Incrémenter de 1"
        icon={<AddIcon />}
        onClick={() => dispatch(increment())}
        color="blue.500"
      />
      <IconButton
        aria-label="Décrémenter de 1"
        icon={<MinusIcon />}
        onClick={() => dispatch(decrement())}
        color="red.500"
      />
    </Stack>
  );
};

export default MealCounter;
