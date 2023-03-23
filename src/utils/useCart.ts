import { useState } from "react";
import { ProductData, CartProductData } from "../types/ProductData";
import sortCartProductData, { sortTypes } from "./sortCartProductData";

export default function useCart(
  initialState: Array<CartProductData> = [],
  sortingFunc: sortTypes = "title"
) {
  const initialStateArr = initialState.map((item) => item);
  sortCartProductData(initialStateArr, sortingFunc, false);
  const [cart, setCart] = useState<Array<CartProductData>>(initialStateArr);
  const [sortFunc, setSortFunc] = useState<sortTypes>(sortingFunc);
  const [reversed, setReversed] = useState<boolean>(false);

  const addItemQuantityInCart = (product: ProductData) => {
    let found = false;
    const newCart: Array<CartProductData> = cart.map((item) => {
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
    const newCart: Array<CartProductData> = cart.reduce((prev, cur) => {
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
    }, [] as Array<CartProductData>);
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
