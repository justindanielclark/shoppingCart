import React, { useState } from "react";
import {
  Outlet,
  useNavigation,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import useLocalStorage from "../../../utils/useLocalStorage";
import dateWithinTime from "../../../utils/datesWithinTime";
import cacheTimeout from "../../../env/cacheTimeout";
import { Cart } from "../../../utils/useCart";

const _localstorage = useLocalStorage();

type Props = {
  cart: Cart;
};

async function rootLoader() {
  const _lsCategories = _localstorage.getCategories();
  if (_lsCategories) {
    const { fetched, ...data } = _lsCategories;
    if (dateWithinTime(fetched, new Date(), cacheTimeout)) {
      return Promise.resolve(data.categories);
    }
  }
  return fetch("https://dummyjson.com/products/categories")
    .then((res) => {
      if (res.status !== 200) {
        throwErr();
      }
      return res.json();
    })
    .then((data) => {
      _localstorage.setCategories(data, new Date());
      return Promise.resolve(data);
    });
  function throwErr() {
    throw new Error(
      "Sorry, Something Has Gone Wrong. Unable to Product Category Info From Server"
    );
  }
}

function Root({ cart }: Props) {
  const location = useLocation();
  const [lastLoc, setLoc] = useState<string>(location.pathname);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const categories = useLoaderData() as string[];
  if (lastLoc !== location.pathname && menuOpen) {
    setMenuOpen(false);
  }
  const toggleMenu = (): void => {
    setLoc(location.pathname);
    setMenuOpen((menuBool) => !menuBool);
  };
  return (
    <>
      <Header handleMenuClick={toggleMenu} menuOpen={menuOpen} cart={cart} />
      <div className=" bg-gradient-to-b from-stone-900 to-neutral-800  text-white flex-1 flex md:flex-row flex-col-reverse flex-nowrap relative overflow-hidden">
        <Outlet />
        <SideBar categories={categories} menuOpen={menuOpen} />
      </div>
    </>
  );
}

export { rootLoader };
export default Root;
