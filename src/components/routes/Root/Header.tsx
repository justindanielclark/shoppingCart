import React from "react";
import { Link } from "react-router-dom";
import SVG from "../../../assets/SVGs/SVG";
import { Cart } from "../../../utils/useCart";

const liClasses =
  "bg-neutral-800 w-full md:w-fit md:rounded-lg p-2 hover:bg-neutral-700 transition-colors ease-in duration-300";
const linkClasses = "flex flex-row items-center gap-1";

type Props = {
  handleMenuClick: () => void;
  menuOpen: boolean;
  cart: Cart;
};

function Header({ handleMenuClick, menuOpen, cart }: Props) {
  const itemsQuantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
  const numItems = itemsQuantity > 99 ? "*" : itemsQuantity;
  return (
    <header className="bg-gradient-to-b from-stone-900 to-neutral-800 text-white border-b-2 border-white">
      <div className="flex md:flex-row flex-col justify-between mx-auto items-start md:items-center">
        <div className="flex flex-row justify-between w-full md:w-fit items-center">
          <div className="flex flex-row items-center pl-2">
            <img
              src={SVG.dummy}
              alt="dummyIcon"
              className="h-10 w-10 -scale-x-100"
            />
            <h1 className="font-bold text-2xl lg:text-3xl flex items-center h-16 ml-3 md:ml-0">
              DummyJSONStore
            </h1>
          </div>
          <div className="relative">
            <div
              className={`${
                menuOpen || numItems === 0 ? "hidden" : "flex"
              } md:hidden absolute -left-3 -top-3 h-5 w-5 text-sm font-bold bg-yellow-400 items-center justify-center text-black rounded-full`}
            >
              {numItems}
            </div>
            <img
              onClick={handleMenuClick}
              className="h-8 w-8 md:hidden mr-3"
              src={SVG.hamburger}
              alt="ExpandMenuIcon"
              aria-roledescription="Expands/Contracts Hamburger Menu"
              role={"button"}
            />
          </div>
        </div>
        <nav
          className={`w-full md:pr-4 md:w-fit ${
            menuOpen ? "block" : "hidden md:block"
          }`}
        >
          <ul className="list-none flex md:flex-row flex-col md:gap-4 gap-0 text-xl justify-center items-center">
            <li
              className={`${liClasses} border-t-2 border-white md:border-t-0`}
            >
              <Link to={"/"} className={linkClasses}>
                <img src={SVG.home} alt="Home Icon" className="h-4 w-4" />
                <span className="block">Home</span>
              </Link>
            </li>
            <li className={liClasses}>
              <Link to={"/contact"} className={linkClasses}>
                <img src={SVG.phone} alt={"Contact Icon"} className="h-4 w-4" />
                <span className="block">Contact Us</span>
              </Link>
            </li>
            {cart.length > 0 ? (
              <li className={`${liClasses} relative`}>
                <Link to={"/cart"} className={linkClasses}>
                  <img
                    src={SVG.shoppingCart}
                    alt={"Shopping Cart Icon"}
                    className="h-4 w-4"
                  />
                  <span className="block">Cart</span>
                  <span
                    className={`${
                      menuOpen ? "flex" : "hidden"
                    } relative md:flex md:absolute md:-top-2 md:-right-3 md:m-0 ml-2 text-sm bg-yellow-400 text-black rounded-full w-6 h-6 justify-center items-center font-bold`}
                  >
                    {numItems > 99 ? "*" : numItems}
                  </span>
                </Link>
              </li>
            ) : undefined}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
