import { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home/Home";
import Root, { rootLoader } from "./routes/Root/Root";
import Category, { categoryLoader } from "./routes/Category/Category";
import Product, { productLoader } from "./routes/Product/Product";
import Cart from "./routes/Cart/Cart";
import useCart from "../utils/useCart";
import ErrorPage from "./shared/ErrorPage";

function App() {
  const scrollPos = useRef({ pos: undefined, route: undefined });
  const cart = useCart();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root cart={cart.cart} />,
      loader: rootLoader,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart cart={cart} scrollPos={scrollPos} />,
        },
        {
          path: "/category/:categoryID",
          element: (
            <Category
              addItemHandler={cart.addItemQuantityInCart}
              scrollPos={scrollPos}
            />
          ),
          loader: categoryLoader,
          errorElement: (
            <ErrorPage message="Unfortunately, we are unable to load a category of products of that name at this time" />
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
