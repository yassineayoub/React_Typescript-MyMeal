import PropTypes from 'prop-types';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';
import React, { SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setMealName } from '../../reducers/mealReducer';


type MealNameProps = {
  index: number;
};

const MealName = ({ index }: MealNameProps) => {
  const { meals } = useAppSelector((state) => state.meal);
  const dispatch = useAppDispatch();
  console.log(meals);

  return (
    <FormControl isRequired>
      <FormLabel>Repas {index + 1}</FormLabel>
      <Input
        placeholder="Entrez un nom"
        onChange={(e) =>
          dispatch(setMealName({ name: e.target.value, index: index, food: [{}] }))
        }
      />
    </FormControl>
  );
};

// MealName.propTypes = {
//   setMealName: PropTypes.func.isRequired,
// };

export default MealName;
