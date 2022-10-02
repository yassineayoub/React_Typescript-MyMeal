import React from 'react'
import { Badge, Heading, Text } from '@chakra-ui/react'

type FoodListProps = {
  name: string
}

const FoodMealName = ({ name }: FoodListProps) => {
  return (
    <Badge color="ActiveCaption"  fontSize='xl'>Repas: {name}</Badge >
  )
}

export default FoodMealName