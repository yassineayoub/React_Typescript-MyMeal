import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Food from '../components/Food/Food';

// Define a type for the slice state
interface MealState {
  mealCount: number;
  meals: Meal[];
  foodItems: FoodItem[];
  searchValue: string;
}
export type Meal = {
  name: string;
  index: number;
  food: FoodItem[];
  checked?: boolean;
};
export type FoodItem = {
  id: number;
  foodName: string;
  protein: number;
  carbs: number;
  fat: number;
  serving: number;
  unit: string;
  checked?: boolean;
};

// Define the initial state using that type
const initialState: MealState = {
  searchValue: '',
  mealCount: 1,
  meals: [],
  foodItems: [],
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
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
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
    setFoodItems: (state, action: PayloadAction<FoodItem[]>) => {
      state.foodItems = action.payload;
    },
    insertToFoodItemToMeal: (
      state,
      action: PayloadAction<{ mealId: number; foodItem: FoodItem }>
    ) => {
      const { mealId, foodItem } = action.payload;
      const meal = state.meals[mealId];

      // if (state.meals[mealId].food.length > 0) {
        const copy = [...meal.food];
        const index = copy.findIndex((item) => item.id === foodItem.id);
        // TODO index = 0 bug
        if (index !== -1) {
          const newFoodList = copy.filter(
            (item) => item.id !== copy[index].id
          );
          meal.food = newFoodList;
        // }
      } else {
        meal.food = [...meal.food, action.payload.foodItem];
      }
      console.log(meal);
    },
    insertFoodItemsToMeal: (state) => {
      state.meals.forEach((meal) => {
        if (meal.checked) {
          meal.food = [...meal.food, ...state.foodItems];
        }
      });
      state.foodItems = [];
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
  setFoodItems,
  setSearchValue,
  insertFoodItemsToMeal,
  insertToFoodItemToMeal,
} = mealReducer.actions;

export default mealReducer.reducer;
