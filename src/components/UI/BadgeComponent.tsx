import { Badge } from '@chakra-ui/react'
import React from 'react'

type BadgeComponent = {
  name: string,
  color: string,
  data: number,
}

const BadgeComponent = ({ name, color, data }: BadgeComponent) => {
  return (
    <Badge variant="solid" colorScheme={color}>
          {name}<br/>
          {data.toFixed(1)}
    </Badge>
  )
}

export default BadgeComponent;