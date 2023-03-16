import React from "react";
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
}: ProductData) {
  return (
    <section className="bg-neutral-300 text-black rounded-lg grid grid-cols-productCardGrid shadow-zinc-900 shadow-md overflow-hidden border-t-2 border-l-2 border-stone-800">
      <div id="imgHolder" className="relative overflow-hidden rounded-l-lg">
        {stock <= 25 ? (
          <p className="top-1 left-1 text-red-800 z-20 absolute font-bold bg-yellow-400 leading-none rounded p-0.5">
            Only {stock} left in stock!
          </p>
        ) : undefined}
        <img
          src={thumbnail}
          className="rounded absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
        />
      </div>
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
            <button className="text-white bg-neutral-800 p-1 w-full">
              Product Details
            </button>
          </Link>
          <button className="text-white bg-green-900 p-1 w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
