import sortCartProductData from "../sortCartProductData";
import { CartProductData } from "../../types/ProductData";

const exampleData: Array<CartProductData> = [
  {
    title: "Playstation 5",
    brand: "Sony",
    discountPercentage: 5,
    id: 1,
    price: 599,
    quantity: 1,
    category: "Gaming Console",
    description: "",
    images: [],
    rating: 5,
    stock: 10,
    thumbnail: "www.fakeurl.com",
  },
  {
    brand: "Microsoft",
    discountPercentage: 12,
    id: 2,
    price: 575,
    quantity: 5,
    title: "Xbox One",
    category: "Gaming Console",
    description: "",
    images: [],
    rating: 5,
    stock: 10,
    thumbnail: "www.fakeurl.com",
  },
  {
    brand: "Nintendo",
    discountPercentage: 75,
    id: 4,
    price: 100,
    quantity: 10000,
    title: "NES",
    category: "Gaming Console",
    description: "",
    images: [],
    rating: 5,
    stock: 10,
    thumbnail: "www.fakeurl.com",
  },
  {
    brand: "Nintendo",
    discountPercentage: 25,
    id: 3,
    price: 399,
    quantity: 2,
    title: "Switch",
    category: "Gaming Console",
    description: "",
    images: [],
    rating: 5,
    stock: 10,
    thumbnail: "www.fakeurl.com",
  },
];

describe("Descending Testing", () => {
  it("sorts by unit price", () => {
    sortCartProductData(exampleData, "unitPrice", false);
    expect(exampleData[0].title).toBe("Playstation 5");
    expect(exampleData[1].title).toBe("Xbox One");
    expect(exampleData[2].title).toBe("Switch");
    expect(exampleData[3].title).toBe("NES");
  });
  it("sorts by total price", () => {
    sortCartProductData(exampleData, "totalPrice", false);
    expect(exampleData[0].title).toBe("NES");
    expect(exampleData[1].title).toBe("Xbox One");
    expect(exampleData[2].title).toBe("Switch");
    expect(exampleData[3].title).toBe("Playstation 5");
  });
  it("sorts by title", () => {
    sortCartProductData(exampleData, "title", false);
    expect(exampleData[0].title).toBe("NES");
    expect(exampleData[1].title).toBe("Playstation 5");
    expect(exampleData[2].title).toBe("Switch");
    expect(exampleData[3].title).toBe("Xbox One");
  });
  it("sorts by quantity", () => {
    sortCartProductData(exampleData, "quantity", false);
    expect(exampleData[0].title).toBe("NES");
    expect(exampleData[1].title).toBe("Xbox One");
    expect(exampleData[2].title).toBe("Switch");
    expect(exampleData[3].title).toBe("Playstation 5");
  });
});

describe("Ascending Testing", () => {
  it("sorts by unit price", () => {
    sortCartProductData(exampleData, "unitPrice", true);
    expect(exampleData[3].title).toBe("Playstation 5");
    expect(exampleData[2].title).toBe("Xbox One");
    expect(exampleData[1].title).toBe("Switch");
    expect(exampleData[0].title).toBe("NES");
  });
  it("sorts by total price", () => {
    sortCartProductData(exampleData, "totalPrice", true);
    expect(exampleData[3].title).toBe("NES");
    expect(exampleData[2].title).toBe("Xbox One");
    expect(exampleData[1].title).toBe("Switch");
    expect(exampleData[0].title).toBe("Playstation 5");
  });
  it("sorts by title", () => {
    sortCartProductData(exampleData, "title", true);
    expect(exampleData[3].title).toBe("NES");
    expect(exampleData[2].title).toBe("Playstation 5");
    expect(exampleData[1].title).toBe("Switch");
    expect(exampleData[0].title).toBe("Xbox One");
  });
  it("sorts by quantity", () => {
    sortCartProductData(exampleData, "quantity", true);
    expect(exampleData[3].title).toBe("NES");
    expect(exampleData[2].title).toBe("Xbox One");
    expect(exampleData[1].title).toBe("Switch");
    expect(exampleData[0].title).toBe("Playstation 5");
  });
});
