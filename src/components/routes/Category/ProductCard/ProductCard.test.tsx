import React from "react";
import "@testing-library/jest-dom";
import ProductCard from "./ProductCard";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const mockScrollPos = { current: { pos: undefined, route: undefined } };
const mockFunction = jest.fn();
const fakeProduct = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  images: [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    "https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg",
    "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  ],
};

test("It properly displays each product data field required", async () => {
  render(<ProductCard product={fakeProduct} addItemHandler={mockFunction} />);
});
