import React, { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { ProductData } from "../../../types/FetchedData";
import { categoryNameFormatter } from "../../../utils/categoryNameFormatter";

function Product() {
  const data = useLoaderData() as ProductData;
  const {
    id,
    brand,
    category,
    description,
    discountPercentage,
    images,
    price,
    rating,
    stock,
    thumbnail,
    title,
  } = data;

  console.log(data);
  return (
    <div className="flex-1">
      <h2>{title}</h2>
      <h3>{brand}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Product;
