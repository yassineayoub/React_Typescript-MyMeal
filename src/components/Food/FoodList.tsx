import PropTypes from 'prop-types';
import { Badge, List, ListIcon, ListItem, UnorderedList } from '@chakra-ui/react';
import { CheckIcon, SmallAddIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';

type FoodItem = {
  id: number;
  foodName: string;
  protein: number;
  carbs: number;
  fat: number;
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

  console.log(filteredArray);

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
          { foodName, protein, carbs, fat, id, checked }: FoodItem,
          index: number
        ) => (
          <ListItem key={index} onClick={() => handleChecked(id)}>
            <ListIcon
              as={checked ? CheckIcon : SmallAddIcon}
              color="green.700"
            />
            <Badge color="blue">{protein}</Badge>
            {`${foodName} proteines: ${protein} carbs:${carbs} fat:${fat} `}
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
