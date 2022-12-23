import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Todo } from "../pages/Todo";

export function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Todo />,
    },
  ]);

  return <RouterProvider router={router} />;
}
