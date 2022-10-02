import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import Food from '../components/Food/Food';
import Header from '../components/Layout/Header';
import Plan from '../components/Plan/Plan';
import Total from '../components/Total/Total';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Plan />
      </>
    ),
  },
  {
    path: '/food',
    element: (
      <>
        <Header />
        <Food />
      </>
    ),
  },
  {
    path: '/meal/:mealId',
    element: (
      <>
        <Header />
        <Food />
      </>
    ),
  },
  {
    path: '/mymeal',
    element: (
      <>
        <Header />
        <Total />
      </>
    ),
  },
]);
