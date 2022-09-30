import { Checkbox, Stack, Text } from '@chakra-ui/react';
import { setIsChecked } from '../../reducers/mealReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const FoodCheckBox = () => {
  const { meals } = useAppSelector((state) => state.meal);
  const dispatch = useAppDispatch();

  return (
    <Stack spacing={5} direction="column" alignItems="center">
      <Text as="i">Ajouter les aliments au(x) repas:</Text>
      <Stack direction="row" spacing={5}>
        {meals.map((meal) => (
          <Checkbox
            onChange={(e) =>
              dispatch(
                setIsChecked({ bool: e.target.checked, index: meal.index })
              )
            }
            value={meal.name}
            isChecked={meal.checked}
            checked={meal.checked}
            key={meal.index}
            colorScheme="red"
          >
            {meal.name}
          </Checkbox>
        ))}
      </Stack>
    </Stack>
  );
};

export default FoodCheckBox;
