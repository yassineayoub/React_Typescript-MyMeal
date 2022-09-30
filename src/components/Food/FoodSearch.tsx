import { FormControl, FormLabel, IconButton, Input, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { setSearchValue } from '../../reducers/mealReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';



const FoodSearch = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('')
  const { searchValue } = useAppSelector((state) => state.meal)
  const handleChangeSearch = (search: string) => {
    setSearch(search)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchValue(search))
    }, 250);
    return () => clearTimeout(timer)
  }, [search])

  return (
    <FormControl>
      <FormLabel htmlFor="findAliment">Chercher un aliment</FormLabel>
      <Input
        id="findAliment"
        value={search}
        onChange={(e) => handleChangeSearch(e.target.value)}
      />
      {/* <IconButton></IconButton> */}
    </FormControl>
  );
};

export default FoodSearch;
