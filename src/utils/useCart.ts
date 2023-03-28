import { useState } from "react";
import { ProductData, CartProductData } from "../types/ProductData";
import sortCartProductData, { sortTypes } from "./sortCartProductData";

export type Cart = Array<CartProductData>;

export type UseCart = {
  reversed: boolean;
  sortFunc: sortTypes;
  cart: Cart;
  toggleAscendingSort: () => void;
  reduceItemQuantityInCart: (product: ProductData) => void;
  addItemQuantityInCart: (product: ProductData) => void;
  deleteItemFromCart: (product: ProductData) => void;
  resetCart: () => void;
  changeSortingFunc: (sortFuncType: sortTypes) => void;
};

export default function useCart(
  initialState: Cart = [],
  sortingFunc: sortTypes = "title"
): UseCart {
  const initialStateArr = initialState.map((item) => item);
  sortCartProductData(initialStateArr, sortingFunc, false);
  const [cart, setCart] = useState<Cart>(initialStateArr);
  const [sortFunc, setSortFunc] = useState<sortTypes>(sortingFunc);
  const [reversed, setReversed] = useState<boolean>(false);

  const addItemQuantityInCart = (product: ProductData) => {
    let found = false;
    const newCart: Cart = cart.map((item) => {
      if (item.id === product.id) {
        found = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    if (!found) {
      newCart.push({ ...product, quantity: 1 });
    }
    sortCartProductData(newCart, sortFunc, reversed);
    setCart(newCart);
  };
  const reduceItemQuantityInCart = (product: ProductData) => {
    const newCart: Cart = cart.reduce((prev, cur) => {
      if (cur.id === product.id) {
        if (cur.quantity === 1) {
          return prev;
        } else {
          prev.push({ ...cur, quantity: cur.quantity - 1 });
        }
      } else {
        prev.push(cur);
      }
      return prev;
    }, [] as Cart);
    sortCartProductData(newCart, sortFunc, reversed);
    setCart(newCart);
  };
  const deleteItemFromCart = (product: ProductData) => {
    const newCart = cart.filter((item) => {
      return item.id !== product.id;
    });
    sortCartProductData(newCart, sortFunc, reversed);
    setCart(newCart);
  };
  const resetCart = () => {
    setCart([]);
  };
  const changeSortingFunc = (sortFuncType: sortTypes) => {
    setSortFunc(sortFuncType);
    const newCart = cart.map((item) => item);
    sortCartProductData(newCart, sortFuncType, reversed);
    setCart(newCart);
  };
  const toggleAscendingSort = () => {
    const newSorting = !reversed;
    setReversed((x) => !x);
    const newCart = cart.map((item) => item);
    sortCartProductData(newCart, sortFunc, newSorting);
    setCart(newCart);
  };

  return {
    reversed,
    toggleAscendingSort,
    sortFunc,
    cart,
    reduceItemQuantityInCart,
    addItemQuantityInCart,
    deleteItemFromCart,
    resetCart,
    changeSortingFunc,
  };
}
