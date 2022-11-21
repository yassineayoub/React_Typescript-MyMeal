import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FoodMealName from '../Food/FoodMealName';
import { FoodItem, setUpdatedFoodItem } from '../../reducers/mealReducer';
import SubTotal from './SubTotal';
import FoodCardTotal from './FoodCardTotal';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  Divider,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { replace } from 'formik';

const Total = () => {
  const { meals, myMeal } = useAppSelector((state) => state.meal);
  const dispatch = useAppDispatch();
  const [myMeals, setUpdatedMeals] = useState(meals);
  const [amount, setAmount] = useState<string | null>();

  const test = myMeal.map((item) =>
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
  console.log(test, test);

  useEffect(() => {
    setUpdatedMeals(myMeal);
  }, [myMeal, meals]);

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

  [{ prot: 0, glu: 0, fat: 0 }];

  return (
    <Box
      w={['95%', '60%', '40%']}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="auto"
      textAlign="center"
      gap={2}
    >
      {myMeals.map(({ food, name, index }) => (
        <Box
          sx={{
            marginBottom: '1rem',
            boxShadow:
              'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
            padding: '1rem',
          }}
          key={index}
        >
          <Stack>
            <TableContainer>
              <Table size="sm" variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <FoodMealName name={name} />
                  </Tr>
                  <Tr>
                    <Th>Nom</Th>
                    <Th textAlign="center">Proteines (g)</Th>
                    <Th textAlign="center">Glucides (g)</Th>
                    <Th textAlign="center">Lipides (g)</Th>
                    <Th textAlign="center">Qt (g)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {food.map((foodItem, i) => {
                    return (
                      <Tr key={i}>
                        <Td>
                          {foodItem.foodName.substring(0, 1).toUpperCase() +
                            foodItem.foodName.substring(1)}
                        </Td>
                        <Td textAlign="center">{foodItem.protein}</Td>
                        <Td textAlign="center">{foodItem.carbs}</Td>
                        <Td textAlign="center">{foodItem.fat}</Td>
                        <Input
                          sx={{
                            width: '60px',
                            padding: 1,
                            textAlign: 'center',
                          }}
                          type="number"
                          inputMode="numeric"
                          value={foodItem.serving.toString().replace(/^0+/, '')}
                          onChange={(e) =>
                            handleSetAmount(+e.target.value, index, foodItem)
                          }
                        />
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
          <Divider />
          <SubTotal index={index} />
        </Box>
      ))}
      <Button
        as={RouterLink}
        to={'/'}
        type="submit"
        colorScheme="blue"
        marginTop={5}
      >
        Mes repas
      </Button>
    </Box>
  );
};

export default Total;
