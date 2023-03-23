import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root/Root";
import Home from "./routes/Home/Home";
import Category from "./routes/Category/Category";
import Product from "./routes/Product/Product";

import ProductsInCategoryData from "../types/ProductsInCategoryData";
import ProductData from "../types/ProductData";
import ErrorPage from "./shared/ErrorPage";

type Props = {};

function App({}: Props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/category/:categoryID",
          element: <Category />,
          loader: async ({ params }): Promise<ProductsInCategoryData> =>
            fetch(
              `https://dummyjson.com/products/category/${params.categoryID}`
            ).then((res) => res.json()),
          errorElement: (
            <ErrorPage message="Unfortunately, No Such Category Exists" />
          ),
        },
        {
          path: "/product/:productID",
          element: <Product />,
          loader: async ({ params }): Promise<ProductData> =>
            fetch(`https://dummyjson.com/products/${params.productID}`).then(
              (res) => res.json()
            ),
          errorElement: (
            <ErrorPage message="Unfortunately, No Such Product Exists" />
          ),
        },
        {
          path: "/contact",
          element: <div className="flex-1">Contact Us Path</div>,
        },
        {
          path: "/:errorRoute",
          element: <ErrorPage message="Unfortunately, No Such Page Exists" />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
