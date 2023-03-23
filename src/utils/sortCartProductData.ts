import { CartProductData } from "../types/ProductData";
type sortTypes = "title" | "quantity" | "totalPrice" | "unitPrice";
export default function sortCartProductData(
  arr: Array<CartProductData>,
  sortType: sortTypes,
  reversed: boolean
): void {
  switch (sortType) {
    case "quantity": {
      arr.sort((a, b) => {
        return (reversed ? -1 : 1) * (a.quantity < b.quantity ? 1 : -1);
      });
      return;
    }
    case "title": {
      arr.sort((a, b) => {
        return (reversed ? -1 : 1) * a.title.localeCompare(b.title);
      });
      return;
    }
    case "totalPrice": {
      arr.sort((a, b) => {
        return (
          (reversed ? -1 : 1) *
          ((a.price - a.price * (a.discountPercentage / 100)) * a.quantity <
          (b.price - b.price * (b.discountPercentage / 100)) * b.quantity
            ? 1
            : -1)
        );
      });
      return;
    }
    case "unitPrice": {
      arr.sort((a, b) => {
        return (
          (reversed ? -1 : 1) *
          (a.price - a.price * (a.discountPercentage / 100) <
          b.price - b.price * (b.discountPercentage / 100)
            ? 1
            : -1)
        );
      });
      return;
    }
  }
}

export type { sortTypes };
