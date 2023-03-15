import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import SVG from "../../../assets/SVGs/SVG";
import Header from "./Header";
import SideBar from "./SideBar";
import categories from "../../../data/categories";

type SidebarStatus = "hidden" | "hiding" | "opening" | "open";

function Root() {
  const [sidebarStatus, setSidebarStatus] = useState<SidebarStatus>("hidden");
  const handleClick_OpenSidebar = (): void => {
    setSidebarStatus("opening");
  };
  const handleClick_CloseSidebar = (): void => {
    setSidebarStatus("hiding");
  };
  const handleSidebarAnimationEnd_Hiding = (): void => {
    setSidebarStatus("hidden");
  };
  const handleSidebarAnimationEnd_Opening = (): void => {
    setSidebarStatus("open");
  };

  return (
    <>
      <Header className="bg-gradient-to-b from-stone-900 to-neutral-800 text-white" />
      <div className="flex md:flex-row flex-col-reverse flex-nowrap bg-slate-700  text-white flex-1 overflow-hidden relative">
        <Outlet />
        <SideBar
          className="h-full bg-gradient-to-b from-neutral-800 to-stone-900 text-white overflow-y-scroll absolute w-full md:w-fit md:relative md:top-auto top-0"
          categories={categories}
        />
      </div>
    </>
  );
}

export default Root;
