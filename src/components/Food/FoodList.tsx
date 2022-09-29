import PropTypes from 'prop-types';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

type FoodItem = {
  foodName: string;
  protein: number;
  carbs: number;
  fat: number;
};
type FoodListProps = {
  food: FoodItem[];
  search: string;
};

const FoodList = ({ food, search }: FoodListProps) => {
  const [filteredArray, setFilteredArray] = useState<FoodItem[]>([]);
  console.log(filteredArray);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('je cherche !');
      setFilteredArray(food.filter((item) => item.foodName.includes(search)));
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <UnorderedList>
      {filteredArray.map(
        ({ foodName, protein, carbs, fat }: FoodItem, index: number) => (
          <ListItem
            key={index}
          >{`${foodName} proteines:${protein} carbs:${carbs} fat:${fat} `}</ListItem>
        )
      )}
    </UnorderedList>
  );
};

FoodList.propTypes = {
  food: PropTypes.array.isRequired,
};

export default FoodList;
