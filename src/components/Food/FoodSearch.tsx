import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import React, { useState } from 'react';

type FoodSearchProps = {
  search: string,
  setSearch: (e: string) => void
}

const FoodSearch = ({ search, setSearch }: FoodSearchProps) => {

  return (
    <FormControl>
      <FormLabel htmlFor="findAliment">Chercher un aliment</FormLabel>
      <Input
        id="findAliment"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </FormControl>
  );
};

export default FoodSearch;
