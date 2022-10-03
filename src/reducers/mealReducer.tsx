import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Food from '../components/Food/Food';

// Define a type for the slice state
interface MealState {
  mealCount: number;
  meals: Meal[];
  myMeal: Meal[];
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
  updatedServing?: number
};

// Define the initial state using that type
const initialState: MealState = {
  searchValue: '',
  mealCount: 1,
  meals: [],
  myMeal: [],
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
      state.meals = state.myMeal = mealArray;
    },
    setIsChecked: (
      state,
      action: PayloadAction<{ index: number; bool: boolean }>
    ) => {
      const { index, bool } = action.payload;
      const mealArray = [...state.meals];
      mealArray[index].checked = bool;
      state.meals = state.myMeal = mealArray;
    },
    setFoodItems: (state, action: PayloadAction<FoodItem[]>) => {
      state.foodItems = action.payload;
    },
    insertToFoodItemToMeal: (
      state,
      action: PayloadAction<{ mealIndex: number; foodItem: FoodItem }>
    ) => {
      const { mealIndex, foodItem } = action.payload;
      const meal = state.meals[mealIndex];
      const myMeal = state.myMeal[mealIndex];

      const copy = [...meal.food];
      const copyMyMeal = [...myMeal.food];

      const index = copy.findIndex((item) => item.id === foodItem.id);

      if (index !== -1) {
        const newFoodList = copy.filter((item) => item.id !== copy[index].id);
        meal.food = newFoodList;
        const newFoodListMyMeal = copyMyMeal.filter(
          (item) => item.id !== copyMyMeal[index].id
        );
        myMeal.food = newFoodListMyMeal;
        // }
      } else {
        meal.food = [...meal.food, action.payload.foodItem];
        myMeal.food = [...myMeal.food, action.payload.foodItem];
      }
    },
    insertFoodItemsToMeal: (state) => {
      state.meals.forEach((meal) => {
        if (meal.checked) {
          meal.food = [...meal.food, ...state.foodItems];
        }
      });
      state.foodItems = [];
    },
    // setMyMeal: (state, action: PayloadAction<Meal[]>) => {
    //   state.myMeal = action.payload;
    // },
    setUpdatedFoodItem: (
      state,
      action: PayloadAction<{
        mealIndex: number;
        updatedFoodItem: FoodItem;
        foodItemIndex: number;
      }>
    ) => {
      const { mealIndex, updatedFoodItem, foodItemIndex } = action.payload;
      console.log(state.myMeal[mealIndex].food);
      state.myMeal[mealIndex].food[foodItemIndex] = updatedFoodItem;
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
  // setMyMeal,
  setUpdatedFoodItem,
} = mealReducer.actions;

export default mealReducer.reducer;
