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
import {
  loader as gameLoader,
  action as gameAction,
} from "./components/index/index.data.js";
import { loader as scoreboardLoader } from "./components/scoreboard/scoreboard.data.js";

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
            action: UserAction,
          },
          {
            path: "/game",
            element: <Index />,
            loader: gameLoader,
            action: gameAction,
          },
          {
            path: "/scoreboard",
            element: <Scoreboard />,
            loader: scoreboardLoader,
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
