import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import Index from "./components/index/index.jsx";
import ErrorPage from "./error-page.jsx";
import Root from "./components/root/root.jsx";
import User from "./components/user/user.jsx";
import Scoreboard from "./components/scoreboard/scoreboard.jsx";

import { action as UserAction } from "./components/user/user.data.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <User />,
            action: UserAction
          },
          {
            path: "/game",
            element: <Index />,
          },
          {
            path: "/scoreboard",
            element: <Scoreboard />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
