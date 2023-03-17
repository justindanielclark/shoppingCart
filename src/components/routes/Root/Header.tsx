import React from "react";
import { Link } from "react-router-dom";
import SVG from "../../../assets/SVGs/SVG";

const liClasses =
  "bg-neutral-800 w-full md:w-fit md:rounded-lg p-2 hover:bg-neutral-700 transition-colors ease-in duration-300";
const linkClasses = "flex flex-row items-center gap-1";

type Props = {
  handleMenuClick: () => void;
  menuOpen: boolean;
};

function Header({ handleMenuClick, menuOpen }: Props) {
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
          <img
            onClick={handleMenuClick}
            className="h-8 w-8 md:hidden mr-3"
            src={SVG.hamburger}
            alt="ExpandMenuIcon"
            aria-roledescription="Expands Hamburger Menu"
            role={"button"}
          />
        </div>
        <nav
          className={`w-full pr-2 md:w-fit ${
            menuOpen ? "block" : "hidden md:block"
          }`}
        >
          <ul className="list-none flex md:flex-row flex-col md:gap-4 gap-0 text-xl justify-center items-center">
            <li
              className={`${liClasses} border-t-2 border-white md:border-t-0`}
            >
              <Link to={"/"} className={linkClasses}>
                <img src={SVG.home} alt="Home Icon" className="h-4 w-4" />
                Home
              </Link>
            </li>
            <li className={liClasses}>
              <Link to={"/contact"} className={linkClasses}>
                <img src={SVG.phone} alt={"Contact Icon"} className="h-4 w-4" />
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
