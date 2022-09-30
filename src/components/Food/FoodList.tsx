import PropTypes from 'prop-types';
import {
  Badge,
  Box,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { CheckIcon, SmallAddIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';

type FoodItem = {
  id: number;
  foodName: string;
  protein: number;
  carbs: number;
  fat: number;
  serving: number;
  unit: string;
  checked?: boolean;
};

type FoodListProps = {
  food: FoodItem[];
  search: string;
};

const FoodList = ({ food, search }: FoodListProps) => {
  const [filteredArray, setFilteredArray] = useState<FoodItem[]>([]);

  const handleChecked = (id: number) => {
    const foodArray = [...filteredArray];
    const foodIndex = foodArray.findIndex((foodItem) => foodItem.id === id);
    foodArray[foodIndex].checked = !foodArray[foodIndex].checked;
    setFilteredArray(foodArray);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredArray(food.filter((item) => item.foodName.includes(search)));
    }, 200);
    return () => clearTimeout(timer);
  }, [search]);
  
  return (
    <List>
      {filteredArray.map(
        (
          {
            foodName,
            protein,
            carbs,
            fat,
            id,
            checked,
            serving,
            unit,
          }: FoodItem,
          index: number
        ) => (
          <ListItem
            flexDirection="row"
            alignItems="center"
            display="flex"
            padding={2}
            boxShadow={"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"}
            marginBottom={3}
            key={index}
            onClick={() => handleChecked(id)}
          >
            <ListIcon
              as={checked ? CheckIcon : SmallAddIcon}
              w={6}
              h={6}
              color="green.700"
            />
            <Box flex={1}>
              <Badge
                colorScheme={
                  checked ? 'green' : 'blackAlpha'
                }
                variant="subtle"
                w={'100%'}
                padding="1.5"
                position="relative"
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
          </ListItem>
        )
      )}
    </List>
  );
};

FoodList.propTypes = {
  food: PropTypes.array.isRequired,
};

export default FoodList;
