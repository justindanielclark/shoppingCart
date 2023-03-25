import { renderHook, act } from "@testing-library/react";
import useCart from "../useCart";
import ProductData, { CartProductData } from "../../types/ProductData";

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
    price: 100,
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
const exampleItem1: ProductData = {
  title: "Saturn",
  brand: "Sega",
  discountPercentage: 10,
  id: 10,
  price: 200,
  category: "Gaming Console",
  description: "",
  images: [],
  rating: 4.3,
  stock: 25,
  thumbnail: "www.fakeurl.com",
};
const exampleItem2: ProductData = {
  title: "Genesis",
  brand: "Sega",
  discountPercentage: 3,
  id: 100,
  price: 300,
  category: "Gaming Console",
  description: "",
  images: [],
  rating: 4.0,
  stock: 25,
  thumbnail: "www.fakeurl.com",
};
const exampleItem3: ProductData = {
  title: "PSP",
  brand: "Sony",
  discountPercentage: 5,
  id: 1000,
  price: 150,
  category: "Gaming Console",
  description: "",
  images: [],
  rating: 3.6,
  stock: 1,
  thumbnail: "www.fakeurl.com",
};
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

describe("Can Act on Cart State", () => {
  test("by adding objects", () => {
    const { result } = renderHook(() => useCart(exampleCart));
    act(() => {
      result.current.addItemQuantityInCart(exampleItem1);
    });
    expect(result.current.cart[3].title).toBe("Saturn");
    for (let i = 0; i < 3; i++) {
      act(() => {
        result.current.addItemQuantityInCart(exampleItem2);
      });
    }

    expect(result.current.cart[2].title).toBe("Genesis");
    expect(result.current.cart[2].quantity).toBe(3);
  });
  test("by removing objects", () => {
    const { result } = renderHook(() => useCart(exampleCart));
    act(() => {
      const playstationIndex = result.current.cart.findIndex(
        (item) => item.title === "Playstation"
      );
      result.current.reduceItemQuantityInCart(
        result.current.cart[playstationIndex]
      );
    });
    expect(
      result.current.cart.filter((item) => {
        return item.title === "Playstation";
      }).length
    ).toBe(0);

    for (let i = 0; i < 4; i++) {
      act(() => {
        const gameboyAdvIndex = result.current.cart.findIndex(
          (item) => item.title === "Gameboy Advance"
        );
        result.current.reduceItemQuantityInCart(
          result.current.cart[gameboyAdvIndex]
        );
      });
    }
    expect(
      result.current.cart.filter((item) => {
        return item.title === "Gameboy Advance";
      }).length
    ).toBe(1);
    act(() => {
      const gameboyAdvIndex = result.current.cart.findIndex(
        (item) => item.title === "Gameboy Advance"
      );
      result.current.reduceItemQuantityInCart(
        result.current.cart[gameboyAdvIndex]
      );
    });
    expect(
      result.current.cart.filter((item) => {
        return item.title === "Gameboy Advance";
      }).length
    ).toBe(0);
  });
  test("can delete entires from cart", () => {
    const { result } = renderHook(() => useCart(exampleCart));
    act(() => {
      result.current.deleteItemFromCart(result.current.cart[0]);
    });
    expect(
      result.current.cart.filter((item) => item.title === "Gameboy Advance")
        .length
    ).toBe(0);
  });
  test("can change the sorting func and ordering", () => {
    const { result } = renderHook(() => useCart(exampleCart));
    expect(result.current.cart[0].title).toBe("Gameboy Advance");
    expect(result.current.cart[1].title).toBe("Gameboy Color");
    expect(result.current.cart[2].title).toBe("Playstation");
    expect(result.current.cart[3].title).toBe("Switch");
    expect(result.current.cart[4].title).toBe("Xbox");
    act(() => {
      result.current.changeSortingFunc("totalPrice");
    });
    expect(result.current.cart[0].title).toBe("Switch");
    expect(result.current.cart[1].title).toBe("Playstation");
    expect(result.current.cart[2].title).toBe("Xbox");
    expect(result.current.cart[3].title).toBe("Gameboy Advance");
    expect(result.current.cart[4].title).toBe("Gameboy Color");
    act(() => {
      result.current.toggleAscendingSort();
    });
    expect(result.current.cart[4].title).toBe("Switch");
    expect(result.current.cart[3].title).toBe("Playstation");
    expect(result.current.cart[2].title).toBe("Xbox");
    expect(result.current.cart[1].title).toBe("Gameboy Advance");
    expect(result.current.cart[0].title).toBe("Gameboy Color");
  });
});
