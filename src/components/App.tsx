import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { rootLoader } from "./routes/Root/Root";
import Home from "./routes/Home/Home";
import Category from "./routes/Category/Category";
import Product, { productLoader } from "./routes/Product/Product";
import useCart from "../utils/useCart";
import ProductsInCategoryData from "../types/ProductsInCategoryData";
import ProductData from "../types/ProductData";
import ErrorPage from "./shared/ErrorPage";

type Props = {};

function App({}: Props) {
  const cart = useCart();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: rootLoader,
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
          element: <Product addItemHandler={cart.addItemQuantityInCart} />,
          loader: productLoader,
          errorElement: (
            <ErrorPage message="Unfortunately, we were unable to load a product at that URL" />
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
