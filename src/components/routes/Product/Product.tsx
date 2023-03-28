import React, { useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ProductData from "../../../types/ProductData";
import StarsRating from "../../shared/StarsRating";
import { categoryNameFormatter } from "../../../utils/categoryNameFormatter";
import capitalizeAll from "../../../utils/capitalizeAllWords";
import {
  formatDiscount,
  formatPrice,
  formatPriceWithDiscount,
} from "../../../utils/priceFormatter";
import { Link } from "react-router-dom";
import useLocalStorage from "../../../utils/useLocalStorage";
import dateWithinTime from "../../../utils/datesWithinTime";
import cacheTimeout from "../../../env/cacheTimeout";

const _localstorage = useLocalStorage();

type Props = {
  addItemHandler: (data: ProductData) => void;
};

async function productLoader({ params }: LoaderFunctionArgs) {
  if (params.productID) {
    const productID = Number.parseInt(params.productID);
    if (typeof productID === "number") {
      const _lsProduct = _localstorage.getProduct(productID);
      if (_lsProduct) {
        const { fetched, ...productData } = _lsProduct;
        if (dateWithinTime(fetched, new Date(), cacheTimeout)) {
          return Promise.resolve(productData);
        }
      }
    }
    return fetch(`https://dummyjson.com/products/${params.productID}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        const { message, ...productData } = data;
        if (message) {
          throw new Error();
        }
        _localstorage.setProduct(productData, new Date());
        return Promise.resolve(productData);
      });
  }
  throw new Error();
}

function Product({ addItemHandler }: Props) {
  const [shownImage, setShownImage] = useState(0);
  const data = useLoaderData() as ProductData;
  return (
    <div className="flex-1 overflow-x-hidden flex justify-center items-center h-full">
      <div className="bg-neutral-300 flex flex-col text-black rounded-lg max-h-full overflow-hidden-x-hidden max-w-xl border-2 border-yellow-400">
        {/* HEADING */}
        <div className="bg-yellow-400 w-full text-neutral-900 py-1 flex-initial rounded-t-lg">
          <div className="flex flex-row leading-none justify-between">
            <h2 className="text-2xl font-bold pl-1">
              {capitalizeAll(data.title)}
            </h2>
            <div className="flex flex-col pr-2">
              <StarsRating rating={data.rating} />
              <p className="text-right">{data.rating}/5</p>
            </div>
          </div>
          <h3 className="text-xl pl-3">{`(${capitalizeAll(data.brand)})`}</h3>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-x-hidden">
          {/* IMAGES */}
          <div className="flex md:flex-col flex-row">
            <div
              className="flex-1 h-60 w-60"
              style={{
                backgroundImage: `url(${data.images[shownImage]})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="w-8 md:w-full flex md:flex-row flex-col justify-around bg-neutral-800 md:h-16">
              {data.images.map((img, index) => (
                <div
                  key={index}
                  className="p-2 rounded"
                  onMouseEnter={() => {
                    if (shownImage !== index) {
                      setShownImage(index);
                    }
                  }}
                >
                  <input
                    readOnly
                    checked={index === shownImage ? true : false}
                    type={"radio"}
                    className=""
                    key={index}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCT DATA WITH NAVIGATION BUTTONS*/}
          <div className="max-w-lg flex-1 flex flex-col justify-between">
            <table className="">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="bg-neutral-800 text-yellow-400 font-bold text-xl border-y-2 border-black"
                  >
                    Product Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold text-lg flex items-start pl-1 h-fit">
                    Description:
                  </td>
                  <td className="px-1 h-fit">{data.description}</td>
                </tr>
                <tr>
                  <td className="font-bold text-lg flex items-start w-32 pl-1 h-fit">
                    Original Price:
                  </td>
                  <td className="px-1 text-right">{formatPrice(data.price)}</td>
                </tr>
                <tr>
                  <td className="font-bold text-lg flex items-start pl-1">
                    Discount:
                  </td>
                  <td className="px-1 text-red-800 text-right">
                    {formatDiscount(data.price, data.discountPercentage)}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold text-lg flex items-start pl-1">
                    Final Price:
                  </td>
                  <td className="px-1 text-green-900 text-right">
                    {formatPriceWithDiscount(
                      data.price,
                      data.discountPercentage
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col">
              <Link to={`/category/${data.category}`}>
                <button className="bg-neutral-800 w-full text-white font-bold h-8">
                  {`Back to ${categoryNameFormatter(data.category)}`}
                </button>
              </Link>
              <button
                className="bg-green-800 w-full text-white font-bold h-8 rounded-b-lg md:rounded-bl-none"
                onClick={() => {
                  addItemHandler(data);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { productLoader };
export default Product;
