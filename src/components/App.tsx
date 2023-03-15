import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root/Root";
import Category from "./routes/Category/Category";
import CategoryData from "../types/FetchedData";

type Props = {};

function App({}: Props) {
  // useEffect(() => {
  //   fetch("https://dummyjson.com/products")
  //     .then((res) => res.json())
  //     .then(console.log);
  // }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <div className="flex-1">Home Path</div>,
        },
        {
          path: "/category/:categoryID",
          element: <Category />,
          loader: async ({ params }): Promise<CategoryData> =>
            fetch(
              `https://dummyjson.com/products/category/${params.categoryID}`
            ).then((res) => res.json()),
        },
        {
          path: "/product/:id",
          element: <div>Individual Product Path</div>,
        },
        {
          path: "/contact",
          element: <div>Contact Us Path</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
