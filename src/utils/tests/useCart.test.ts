import { renderHook, act, render } from "@testing-library/react";
import useCart from "../useCart";
import { CartProductData } from "../../types/ProductData";

const exampleCart: Array<CartProductData> = [
  {
    title: "Playstation",
    brand: "Sony",
    discountPercentage: 0,
    id: 0,
    price: 599,
    quantity: 1,
    category: "Gaming Console",
    description: "",
    images: [],
    rating: 5,
    stock: 10,
    thumbnail: "www.fakeurl.com",
  },
  {
    title: "Xbox",
    brand: "Microsoft",
    discountPercentage: 10,
    id: 1,
    price: 550,
    quantity: 1,
    category: "Gaming Console",
    description: "",
    images: [],
    rating: 5,
    stock: 10,
    thumbnail: "www.fakeurl.com",
  },
  {
    title: "Switch",
    brand: "Nintendo",
    discountPercentage: 5,
    id: 2,
    price: 375,
    quantity: 2,
    category: "Gaming Console",
    description: "",
    images: [],
    rating: 5,
    stock: 10,
    thumbnail: "www.fakeurl.com",
  },
  {
    title: "Gameboy Advance",
    brand: "Nintendo",
    discountPercentage: 30,
    id: 3,
    price: 150,
    quantity: 5,
    category: "Gaming Console",
    description: "",
    images: [],
    rating: 5,
    stock: 10,
    thumbnail: "www.fakeurl.com",
  },
  {
    title: "Gameboy Color",
    brand: "Nintendo",
    discountPercentage: 10,
    id: 4,
    price: 65,
    quantity: 1,
    category: "Gaming Console",
    description: "",
    images: [],
    rating: 5,
    stock: 10,
    thumbnail: "www.fakeurl.com",
  },
];
describe("Can load a supplied state", () => {
  test("with the default sorting func", () => {
    const { result } = renderHook(() => useCart(exampleCart));
    expect(result.current.cart[0].title).toBe("Gameboy Advance");
    expect(result.current.cart[1].title).toBe("Gameboy Color");
    expect(result.current.cart[2].title).toBe("Playstation");
    expect(result.current.cart[3].title).toBe("Switch");
    expect(result.current.cart[4].title).toBe("Xbox");
  });
  test("with a supplied sorting func", () => {
    const { result } = renderHook(() => useCart(exampleCart, "unitPrice"));
    expect(result.current.cart[0].title).toBe("Playstation");
    expect(result.current.cart[1].title).toBe("Xbox");
    expect(result.current.cart[2].title).toBe("Switch");
    expect(result.current.cart[3].title).toBe("Gameboy Advance");
    expect(result.current.cart[4].title).toBe("Gameboy Color");
  });
});
