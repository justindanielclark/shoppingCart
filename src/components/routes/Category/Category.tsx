import React, { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import CategoryData from "../../../types/ProductsInCategoryData";
import ProductCard from "./ProductCard/ProductCard";
import { categoryNameFormatter } from "../../../utils/categoryNameFormatter";

type Props = {};

function Category({}: Props) {
  const data = useLoaderData() as CategoryData;
  if (data.products.length === 0) {
    throw new Error("No Products Found For That Category");
  }
  const { categoryID } = useParams();
  const categoryStr = categoryID ? categoryID : "";
  const categoryTitle = categoryNameFormatter(categoryStr);
  return (
    <div
      className="flex-1 overflow-x-hidden relative"
      data-testid="categoryTest"
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
        {data.products.map((product, index) => (
          <ProductCard
            category={product.category}
            images={product.images}
            key={index}
            description={product.description}
            discountPercentage={product.discountPercentage}
            id={product.id}
            price={product.price}
            rating={product.rating}
            stock={product.stock}
            thumbnail={product.thumbnail}
            title={product.title}
            brand={product.brand}
          />
        ))}
      </ul>
    </div>
  );
}

export default Category;
