import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Page/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
