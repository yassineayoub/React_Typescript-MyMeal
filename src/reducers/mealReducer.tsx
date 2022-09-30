import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface MealState {
  mealCount: number;
  meals: Meal[];
}
export type Meal = {
  name: string;
  index: number;
  food?: object[];
  checked?: boolean;
};

// Define the initial state using that type
const initialState: MealState = {
  mealCount: 1,
  meals: [],
};

export const mealReducer = createSlice({
  name: 'meal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.mealCount += 1;
    },
    decrement: (state) => {
      state.mealCount -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.mealCount = action.payload;
    },
    setMealName: (state, action: PayloadAction<Meal>) => {
      const { index } = action.payload;
      const mealArray = [...state.meals];
      mealArray[index] = { ...mealArray[index], ...action.payload };
      state.meals = mealArray;
    },
    setIsChecked: (
      state,
      action: PayloadAction<{ index: number; bool: boolean }>
    ) => {
      const { index, bool } = action.payload;
      const mealArray = [...state.meals];
      mealArray[index].checked = bool;
      state.meals = mealArray;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  setMealName,
  setIsChecked,
} = mealReducer.actions;

export default mealReducer.reducer;
