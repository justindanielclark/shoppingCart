import React, { useEffect, useRef } from "react";
import { UseCart } from "../../../utils/useCart";
import {
  formatPriceWithDiscount,
  formatPrice,
} from "../../../utils/priceFormatter";
import { sortTypes } from "../../../utils/sortCartProductData";

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
      className="flex-1 overflow-x-hidden"
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
          "sticky text-yellow-400 -top-0.5 w-full bg-neutral-900 p-2 z-50"
        }
      >
        <h1 className="text-3xl font-bold underline ">Shopping Cart:</h1>
        <p>Total: {`${totalPrice}`}</p>
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
            <optgroup label="Ascending">
              <option value="Ascending_ProductName">Product Name</option>
              <option value="Ascending_UnitPrice">Unit Price</option>
              <option value="Ascending_TotalPrice">Total Price</option>
              <option value="Ascending_Quantity">Quantity</option>
            </optgroup>
            <optgroup label="Descending">
              <option value="Descending_ProductName">Product Name</option>
              <option value="Descending_UnitPrice">Unit Price</option>
              <option value="Descending_TotalPrice">Total Price</option>
              <option value="Descending_Quantity">Quantity</option>
            </optgroup>
          </select>
        </div>
      </div>

      <ul className="flex flex-col">
        {cart.cart.map((product) => {
          return (
            <li key={product.id}>
              <div>
                <img src={product.thumbnail} alt="" />
              </div>
              <div>
                <h2>{product.title}</h2>

                <p>{product.brand}</p>
                <p>
                  Price Per:
                  {formatPriceWithDiscount(
                    product.price,
                    product.discountPercentage
                  )}
                </p>
                <p>Quantity: {product.quantity}</p>
                <p>
                  Total:
                  {formatPriceWithDiscount(
                    product.price * product.quantity,
                    product.discountPercentage
                  )}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Cart;
