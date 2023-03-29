import React, { useEffect, useRef } from "react";
import { UseCart } from "../../../utils/useCart";
import {
  formatPriceWithDiscount,
  formatPrice,
} from "../../../utils/priceFormatter";
import { sortTypes } from "../../../utils/sortCartProductData";
import capitalizeAllWords from "../../../utils/capitalizeAllWords";
import SVG from "../../../assets/SVGs/SVG";

type Props = {
  cart: UseCart;
  scrollPos: { current: { pos?: number; route?: string } };
};

function Cart({ cart, scrollPos }: Props) {
  useEffect(() => {
    if (
      mainRef &&
      mainRef.current &&
      scrollPos.current.pos &&
      scrollPos.current.route === "cart"
    ) {
      mainRef.current.scrollTo({ top: scrollPos.current.pos });
    }
  }, []);
  const mainRef = useRef<HTMLElement>(null);
  const totalPrice = formatPrice(
    cart.cart.reduce(
      (acc, cur) =>
        acc + cur.price * ((100 - cur.discountPercentage) / 100) * cur.quantity,
      0
    )
  );
  const totalProducts = cart.cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const getDefaultSelectVal = (reversed: boolean, sortFunc: sortTypes) => {
    if (reversed) {
      switch (sortFunc) {
        case "title": {
          return "Ascending_ProductName";
        }
        case "quantity": {
          return "Ascending_Quantity";
        }
        case "totalPrice": {
          return "Ascending_TotalPrice";
        }
        case "unitPrice": {
          return "Ascending_UnitPrice";
        }
      }
    } else {
      switch (sortFunc) {
        case "title": {
          return "Descending_ProductName";
        }
        case "quantity": {
          return "Descending_Quantity";
        }
        case "totalPrice": {
          return "Descending_TotalPrice";
        }
        case "unitPrice": {
          return "Descending_UnitPrice";
        }
      }
    }
  };

  return (
    <main
      className="flex-1 overflow-x-hidden flex flex-col"
      ref={mainRef}
      onScroll={(e) => {
        if (mainRef && mainRef.current) {
          scrollPos.current.pos = mainRef.current.scrollTop;
          scrollPos.current.route = "cart";
        }
      }}
    >
      <div
        role={"heading"}
        className={
          "sticky text-yellow-400 -top-0.5 w-full bg-neutral-900 p-2 z-50 flex md:flex-row flex-col justify-between"
        }
      >
        <div>
          <h1 className="text-3xl font-bold underline ">Shopping Cart:</h1>
          <p className="pl-4 text-lg">Grand Total: {`${totalPrice}`}</p>
        </div>

        <div>
          <label>Sort By:</label>
          <select
            className="bg-neutral-800 p-2 outline-none mx-2"
            defaultValue={getDefaultSelectVal(cart.reversed, cart.sortFunc)}
            onChange={(e) => {
              switch (e.target.selectedOptions[0].value) {
                case "Ascending_ProductName": {
                  cart.changeSortingFunc("title");
                  if (!cart.reversed) {
                    cart.toggleAscendingSort();
                  }
                  break;
                }
                case "Ascending_UnitPrice": {
                  cart.changeSortingFunc("unitPrice");
                  if (!cart.reversed) {
                    cart.toggleAscendingSort();
                  }
                  break;
                }
                case "Ascending_TotalPrice": {
                  cart.changeSortingFunc("totalPrice");
                  if (!cart.reversed) {
                    cart.toggleAscendingSort();
                  }
                  break;
                }
                case "Ascending_Quantity": {
                  cart.changeSortingFunc("quantity");
                  if (!cart.reversed) {
                    cart.toggleAscendingSort();
                  }
                  break;
                }
                case "Descending_ProductName": {
                  cart.changeSortingFunc("title");
                  if (cart.reversed) {
                    cart.toggleAscendingSort();
                  }
                  break;
                }
                case "Descending_UnitPrice": {
                  cart.changeSortingFunc("unitPrice");
                  if (cart.reversed) {
                    cart.toggleAscendingSort();
                  }
                  break;
                }
                case "Descending_TotalPrice": {
                  cart.changeSortingFunc("totalPrice");
                  if (cart.reversed) {
                    cart.toggleAscendingSort();
                  }
                  break;
                }
                case "Descending_Quantity": {
                  cart.changeSortingFunc("quantity");
                  if (cart.reversed) {
                    cart.toggleAscendingSort();
                  }
                  break;
                }
              }
            }}
          >
            <optgroup label="Descending">
              <option value="Descending_ProductName">↓ Product Name ↓</option>
              <option value="Descending_UnitPrice">↓ Unit Price ↓</option>
              <option value="Descending_TotalPrice">↓ Total Price ↓</option>
              <option value="Descending_Quantity">↓ Quantity ↓</option>
            </optgroup>
            <optgroup label="Ascending">
              <option value="Ascending_ProductName">↑ Product Name ↑</option>
              <option value="Ascending_UnitPrice">↑ Unit Price ↑</option>
              <option value="Ascending_TotalPrice">↑ Total Price ↑</option>
              <option value="Ascending_Quantity">↑ Quantity ↑</option>
            </optgroup>
          </select>
        </div>
      </div>

      <ul className="flex flex-col mx-auto container gap-4 my-4">
        {cart.cart.map((product) => {
          return (
            <li
              key={product.id}
              className="flex flex-col md:flex-row max-w-xl mx-auto w-full rounded-lg overflow-hidden relative"
            >
              <img
                className="object-cover w-full h-72 md:h-auto md:w-48"
                src={product.thumbnail}
                alt={`${product.title}_image`}
              />
              <div className="flex-1 flex flex-col h-full">
                <div className="flex flex-row  bg-yellow-400">
                  <h2 className="text-xl font-bold text-black pl-2 flex-1 flex items-center">
                    {capitalizeAllWords(product.title)}
                  </h2>
                  <div className="flex md:flex-row flex-col justify-end md:top-auto md:right-auto absolute md:static top-0 right-0">
                    <button
                      className=" bg-green-800 w-8 h-8"
                      onClick={() => {
                        cart.addItemQuantityInCart(product);
                      }}
                    >
                      <img src={SVG.plus} alt="add_item_icon" />
                    </button>
                    <button
                      className="font-bold text-xl bg-red-700 w-8 h-8"
                      onClick={() => {
                        cart.reduceItemQuantityInCart(product);
                      }}
                    >
                      <img src={SVG.minus} alt="add_item_icon" />
                    </button>
                    <button
                      className="font-bold text-xl bg-red-900 w-8 h-8"
                      onClick={() => {
                        cart.deleteItemFromCart(product);
                      }}
                    >
                      <img src={SVG.close} alt="add_item_icon" />
                    </button>
                  </div>
                </div>
                <div className="pl-3 bg-gradient-to-b from-neutral-800 to-stone-800 flex-1 justify-between">
                  <p className="text-lg ">
                    {capitalizeAllWords(product.brand)}
                  </p>
                  <p className="">
                    Unit Price:
                    <span className="inline ml-2">
                      {formatPriceWithDiscount(
                        product.price,
                        product.discountPercentage
                      )}
                    </span>
                  </p>
                  <p className="">
                    Quantity:{" "}
                    <span className="inline ml-2">{product.quantity}</span>
                  </p>
                  <p className="w-full text-right font-bold text-yellow-400">
                    Total:{" "}
                    <span className="inline ml-2">
                      {formatPriceWithDiscount(
                        product.price * product.quantity,
                        product.discountPercentage
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Cart;
