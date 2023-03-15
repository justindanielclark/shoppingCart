import React from "react";
import capitalizeAll from "../../../../utils/capitalizeAllWords";

type Props = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  brand: string;
};

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
}: Props) {
  return (
    <section className="bg-neutral-300 text-black rounded-lg grid grid-cols-2 gap-2 p-2">
      <div id="imgHolder" className="relative overflow-hidden">
        <img
          src={thumbnail}
          className="rounded absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex md:flex-row flex-col">
        <div className="">
          <h3 className="text-lg font-bold">{`${capitalizeAll(
            title
          )} (${capitalizeAll(brand)})`}</h3>
          <p>Price: {price}</p>
          <p>Rating: {rating}</p>
          <p>Discount: {discountPercentage}</p>
        </div>
        <div className="flex flex-col justify-end">
          <button className="text-white bg-neutral-800 p-2 w-full rounded-t">
            View Product Details
          </button>
          <button className="text-white bg-green-900 p-2 w-full rounded-b">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
