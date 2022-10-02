import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState, useRef, createRef } from 'react';
import { setSearchValue } from '../../reducers/mealReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const FoodSearch = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const { searchValue } = useAppSelector((state) => state.meal);
  const handleChangeSearch = (search: string) => {
    setSearch(search);
  };

  const inputRef = createRef<HTMLInputElement>();
  const handleSearchOrBlur = (ref: HTMLInputElement | null) => {
    if (ref) {
      ref.blur()
    } 
    if (ref && ref.value === ""){
      ref.focus()
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchValue(search));
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <FormControl>
      <FormLabel htmlFor="findAliment">Chercher un aliment</FormLabel>
      <Stack
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        gap={1}
      >
        <Input
          ref={inputRef}
          id="findAliment"
          value={search}
          onBlur={() => console.log('blur')}
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
        <IconButton
          colorScheme="blue"
          onClick={() => handleSearchOrBlur(inputRef.current)}
          style={{ marginTop: 0 }}
          aria-label="Search"
          icon={<SearchIcon />}
        />
        <IconButton
          onClick={() => setSearch('')}
          colorScheme="red"
          style={{ marginTop: 0 }}
          aria-label="delete"
          icon={<CloseIcon />}
        />
      </Stack>
    </FormControl>
  );
};

export default FoodSearch;
