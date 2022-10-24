import React from 'react';
import { Badge, Heading, Text } from '@chakra-ui/react';

type FoodListProps = {
  name: string;
};

const FoodMealName = ({ name }: FoodListProps) => {
  const formatedName = name.substring(0, 1).toUpperCase() + name.slice(1);
  console.log(formatedName, 'hi there');
  return (
    <Text
      sx={{
        border: 'solid 1px black',
        padding: '5px',
        borderRadius: '10px',
        marginBottom: '1rem',
        fontWeight: 'bold',
      }}
    >
      {formatedName}
    </Text>
  );
};

export default FoodMealName;
