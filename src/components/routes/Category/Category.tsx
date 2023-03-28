import React, { useEffect, useRef } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
  useNavigation,
  useLocation,
} from "react-router-dom";
import CategoryData from "../../../types/ProductsInCategoryData";
import ProductData from "../../../types/ProductData";
import ProductCard from "./ProductCard/ProductCard";
import { categoryNameFormatter } from "../../../utils/categoryNameFormatter";
import useLocalStorage from "../../../utils/useLocalStorage";
import dateWithinTime from "../../../utils/datesWithinTime";
import cacheTimeout from "../../../env/cacheTimeout";

const _localstorage = useLocalStorage();
async function categoryLoader({ params }: LoaderFunctionArgs) {
  if (params.categoryID) {
    const _lsCategory = _localstorage.getCategory(params.categoryID);
    if (_lsCategory) {
      const { fetched, name, products } = _lsCategory;
      if (dateWithinTime(fetched, new Date(), cacheTimeout)) {
        const newProducts = products.reduce((acc, curr) => {
          const LS_Product = _localstorage.getProduct(curr);
          if (LS_Product) {
            const { fetched, ...destructedProduct } = LS_Product;
            acc.push(destructedProduct);
          }
          return acc;
        }, [] as Array<ProductData>);
        return Promise.resolve(newProducts);
      }
    }
    return fetch(`https://dummyjson.com/products/category/${params.categoryID}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error();
        }
        return res.json() as Promise<CategoryData>;
      })
      .then((data) => {
        if (data.products.length === 0) {
          throw new Error();
        }
        _localstorage.setCategory(
          params.categoryID as string,
          data.products.map((product) => product.id),
          new Date()
        );
        data.products.forEach((product) => {
          _localstorage.setProduct(product, new Date());
        });
        return Promise.resolve(data.products);
      });
  }

  throw new Error();
}

type Props = {
  addItemHandler: (data: ProductData) => void;
  scrollPos: { current: { pos?: number; route?: string } };
};

function Category({ addItemHandler, scrollPos }: Props) {
  const { categoryID } = useParams();
  const data = useLoaderData() as Array<ProductData>;
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    if (main && main.current) {
      if (scrollPos.current.route !== categoryID) {
        scrollPos.current.pos = 0;
        main.current.scrollTop = 0;
      } else {
        if (scrollPos.current.pos) {
          main.current.scrollTop = scrollPos.current.pos;
        }
      }
    }
  }, [data]);

  const categoryStr = categoryID ? categoryID : "";
  const categoryTitle = categoryNameFormatter(categoryStr);
  return (
    <main
      ref={main}
      className="flex-1 overflow-x-hidden relative"
      data-testid="categoryTest"
      onScroll={(e) => {
        scrollPos.current.pos = e.currentTarget.scrollTop;
        scrollPos.current.route = categoryID;
      }}
    >
      <h2
        className="text-3xl font-bold underline text-yellow-400 sticky -top-0.5 w-full bg-neutral-900 p-2 z-50"
        role={"heading"}
      >
        {categoryTitle}
      </h2>
      <ul
        className="p-2 gap-4 grid grid-cols-categoryProductsGrid justify-center"
        role={"list"}
      >
        {data.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            addItemHandler={addItemHandler}
          />
        ))}
      </ul>
    </main>
  );
}

export { categoryLoader };
export default Category;
