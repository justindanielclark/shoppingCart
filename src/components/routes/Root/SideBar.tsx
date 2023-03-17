import React from "react";
import { NavLink } from "react-router-dom";
import SVG from "../../../assets/SVGs/SVG";
import { sidebarCategoryNameFormatter } from "../../../utils/categoryNameFormatter";

type Props = {
  categories: Array<string>;
  menuOpen: boolean;
};
type CategoryDetail = {
  path: string;
  text: string;
};

function SideBar({ categories, menuOpen }: Props) {
  const subCategories: Array<Array<CategoryDetail>> = [
    [
      /*General*/
    ],
    [
      /*Womens*/
    ],
    [
      /*Mens*/
    ],
  ];
  categories.forEach((category) => {
    let subIndex = 0;
    if (category.match(/womens-/)) {
      subIndex = 1;
    } else if (category.match(/mens-/)) {
      subIndex = 2;
    }
    subCategories[subIndex].push({
      path: `/category/${category}`,
      text: sidebarCategoryNameFormatter(category),
    });
  });

  return (
    <aside
      className={`${
        menuOpen ? "block" : "hidden md:block"
      } z-50 h-full bg-gradient-to-b from-neutral-800 to-stone-900 text-white overflow-x-hidden absolute w-full md:w-fit md:relative md:top-auto`}
    >
      <h2 className="flex text-2xl justify-center items-center gap-2 p-5">
        <img src={SVG.shoppingBag} alt={"Products Icon"} className="h-6 w-6" />
        Products
      </h2>

      <ul className="grid grid-cols-3 md:grid-cols-1">
        {subCategories.map((subCategory, index) => {
          return (
            <li key={index}>
              <h3 className="font-bold text-xl bg-stone-600 text-white pl-1">
                {index === 0 ? "General" : index === 1 ? "Womens" : "Mens"}
              </h3>
              <ul>
                {subCategory.map((category, idx) => (
                  <li className="text-lg" key={idx}>
                    <NavLink
                      to={category.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "bg-neutral-700 block px-2 rounded transition-colors duration-300"
                          : isActive
                          ? "bg-yellow-700 block px-2 rounded transition-colors duration-300"
                          : "block px-2 transition-colors duration-300"
                      }
                    >
                      {category.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default SideBar;
