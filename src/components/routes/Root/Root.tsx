import React, { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import SVG from "../../../assets/SVGs/SVG";
import Header from "./Header";
import SideBar from "./SideBar";
import categories from "../../../data/categories";

function Root() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigation = useNavigation();
  if (navigation.state === "loading" && menuOpen) {
    setMenuOpen(false);
  }
  // console.log(navigation.state);
  const toggleMenu = (): void => {
    setMenuOpen((menuBool) => !menuBool);
  };

  return (
    <>
      <Header handleMenuClick={toggleMenu} menuOpen={menuOpen} />
      <div className=" bg-slate-700  text-white flex-1 flex md:flex-row flex-col-reverse flex-nowrap relative overflow-hidden">
        <Outlet />
        <SideBar categories={categories} menuOpen={menuOpen} />
      </div>
    </>
  );
}

export default Root;
