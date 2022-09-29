import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../components/App/App";
import Plan from "../components/Plan/Plan";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App/>
    ),
  },
  {
    path: "/test",
    element: (
      <Plan/>
    ),
  },
 ])