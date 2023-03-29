import React from "react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Category from "./Category";
import fakeProducts from "../../../data/products";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
const mockScrollPos = { current: { pos: undefined, route: undefined } };
const mockFunction = jest.fn();

const setupWithRouter = () => {
  const testMemoryRouter = createMemoryRouter(
    [
      {
        path: "/",
        element: <div>You landed at home</div>,
      },
      {
        path: "/category/:categoryID",
        element: (
          <Category addItemHandler={mockFunction} scrollPos={mockScrollPos} />
        ),
        loader: ({ params }) => {
          return {
            ...fakeProducts,
            products: fakeProducts.products.slice(0, 5),
          };
        },
      },
    ],
    {
      initialEntries: ["/category/mens-shoes"],
    }
  );
  return <RouterProvider router={testMemoryRouter} />;
};

test("It Loads, TestID is present, Testing Category Heading Is Present", async () => {
  render(setupWithRouter());
  const element = await screen.findByTestId("categoryTest");
  const heading = await screen.findByText("Men's Shoes");
  expect(element).toBeInTheDocument();
  expect(heading).toHaveTextContent("Men's Shoes");
});

test("It Loads Exactly 5 Products", async () => {
  render(setupWithRouter());
  const list = await screen.findByRole("list");
  expect(list.children.length).toBe(5);
});
