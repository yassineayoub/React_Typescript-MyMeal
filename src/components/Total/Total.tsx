import { Button, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import React from 'react'
import { CheckIcon } from '@chakra-ui/icons'
import { useAppSelector } from '../../store/hooks'

const Total = () => {
  const { meals } = useAppSelector((state) => state.meal)
  console.log(meals)
  return (
    <>
    {meals && meals.map(meal => <Text key={meal.index}>{meal.name}</Text>)}
    </>
  )
}

export default Total