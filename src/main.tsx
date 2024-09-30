import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Profile from "./pages/Profile";
import { Dashboard } from "./pages/Profile/Dashboard";
import Settings from "./pages/Profile/Settings";
import { Posts } from "./pages/Profile/Posts";
import { Search } from "./pages/Profile/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./components/Account";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: ":id",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer autoClose={2000} />
  </StrictMode>
);
