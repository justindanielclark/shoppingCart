import React from "react";
import { Link } from "react-router-dom";
import SVG from "../../../assets/SVGs/SVG";

const liClasses =
  "bg-neutral-800 w-full md:w-fit md:rounded-lg p-2 hover:bg-neutral-700 transition-colors ease-in duration-300";
const linkClasses = "flex flex-row items-center gap-1";

type Props = {
  className?: string;
};

function Header({ className }: Props) {
  return (
    <header role={"heading"} className={className ? className : undefined}>
      <div className="container flex md:flex-row flex-col justify-between mx-auto items-start md:items-center">
        <div className="flex flex-row justify-between w-full md:w-fit items-center">
          <h1 className="font-bold text-3xl flex items-center h-16 ml-3 md:ml-0">
            DummyJSONStore
          </h1>
          <img
            className="h-8 w-8 md:hidden mr-3"
            src={SVG.hamburger}
            alt="ExpandMenuIcon"
            aria-roledescription="Expands Hamburger Menu"
            role={"button"}
          />
        </div>
        <nav className="w-full md:w-fit">
          <ul className="list-none flex md:flex-row flex-col md:gap-4 gap-0 text-xl justify-center items-center">
            <li className={liClasses}>
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
