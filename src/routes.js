import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/SignIn";
import UserEdit from "./pages/UserEdit";
import PrivateRoute from "./PrivateRoute";
import { userLoader } from "./loaders/userLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/users",
    element: <PrivateRoute element={<Users />} />,
  },
  {
    path: "/users/:userId",
    element: <PrivateRoute element={<UserEdit />} />,
    loader: userLoader,
  },
]);

export default router;
