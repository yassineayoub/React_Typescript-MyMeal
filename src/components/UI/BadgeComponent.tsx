import { Badge } from '@chakra-ui/react';
import React from 'react';

type BadgeComponent = {
  color: string;
  data: number;
};

const BadgeComponent = ({ color, data }: BadgeComponent) => {
  return (
    <Badge variant="solid" colorScheme={color}>
      {data.toFixed(1)}
    </Badge>
  );
};

export default BadgeComponent;
