import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Profile from "./pages/Profile";

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
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>
);
