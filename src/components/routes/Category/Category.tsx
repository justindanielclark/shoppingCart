import React, { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import CategoryData from "../../../types/FetchedData";
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

  console.log(data);
  return (
    <div className="flex-1 overflow-y-scroll p-5">
      <h2 className="text-3xl">{categoryTitle}</h2>
      <ul className="p-2 gap-4 grid grid-cols-1 lg:grid-cols-2">
        {data.products.map((product, index) => (
          <ProductCard
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
