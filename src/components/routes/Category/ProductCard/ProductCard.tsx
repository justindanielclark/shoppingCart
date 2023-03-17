import React, { useState } from "react";
import capitalizeAll from "../../../../utils/capitalizeAllWords";
import { formatPriceWithDiscount } from "../../../../utils/priceFormatter";
import StarsRating from "../../../shared/StarsRating";
import { Link } from "react-router-dom";
import ProductData from "../../../../types/ProductData";

function ProductCard({
  description,
  discountPercentage,
  id,
  price,
  rating,
  stock,
  thumbnail,
  title,
  brand,
  images,
}: ProductData) {
  return (
    <section className="bg-yellow-400 text-black rounded-lg grid grid-cols-productCardGrid shadow-zinc-900 shadow-md overflow-hidden">
      {/* IMAGE */}
      <div
        className="relative bg-neutral-200"
        style={{
          backgroundImage: `url(${images[0]})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        {stock <= 25 ? (
          <p className="top-1 left-1 text-neutral-900 z-20 absolute font-bold bg-yellow-400 leading-none rounded p-0.5">
            Only {stock} left in stock!
          </p>
        ) : undefined}
      </div>
      {/* PRODUCT DATA AND BUTTONS */}
      <div className="flex flex-col justify-between">
        <div className="">
          <h3 className="font-bold text-lg p-1">{`${capitalizeAll(title)}`}</h3>
          <p className="font-bold text-right text-sm px-1">{`(${capitalizeAll(
            brand
          )})`}</p>
          <div className="grid grid-cols-priceRatingsGrid p-1">
            <p>{formatPriceWithDiscount(price, discountPercentage)}</p>
            <div className="flex flex-col">
              <StarsRating rating={rating} />
              <p className="text-xs text-right">{`${rating}/5`}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <Link to={`/product/${id}`}>
            <button className="text-white bg-neutral-800 p-1 w-full font-bold">
              Product Details
            </button>
          </Link>
          <button className="text-white bg-green-900 p-1 w-full font-bold">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
