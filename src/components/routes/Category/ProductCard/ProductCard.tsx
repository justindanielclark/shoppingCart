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
    <section className="bg-yellow-400 text-black flex flex-col sm:flex-row rounded-lg shadow-zinc-900 shadow-md overflow-hidden">
      {/* IMAGE */}
      <div
        className="relative bg-neutral-200 basis-52 grow-0 shrink"
        // style={{
        //   backgroundImage: `url(${images[0]})`,
        //   backgroundPosition: "center",
        //   backgroundSize: "contain",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        {stock <= 25 ? (
          <p className="top-1 left-1 text-neutral-900 z-20 absolute font-bold bg-yellow-400 leading-none rounded p-0.5">
            Only {stock} left in stock!
          </p>
        ) : undefined}
        <img
          src={images[0]}
          className="object-cover block relative top-1/2 -translate-y-1/2 max-h-40 left-1/2 -translate-x-1/2"
          alt={`thumbnail-${title}-${brand}`}
        />
      </div>
      {/* PRODUCT DATA AND BUTTONS */}
      <div className="flex flex-col justify-between flex-1">
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
