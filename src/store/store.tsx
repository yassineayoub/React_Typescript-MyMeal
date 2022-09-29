import { configureStore } from '@reduxjs/toolkit';
import mealReducer from '../reducers/mealReducer';

const store = configureStore({
  reducer: {
    meal: mealReducer,
  },
});


export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch