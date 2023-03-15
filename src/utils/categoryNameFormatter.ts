function categoryNameFormatter(str: string): string {
  return str
    .split("-")
    .map((word) => {
      const newWord = `${word.charAt(0).toUpperCase()}${word.substring(
        1,
        word.length
      )}`;
      if (newWord === "Womens") return "Women's";
      if (newWord === "Mens") return "Men's";
      return newWord;
    })
    .join(" ");
}

function sidebarCategoryNameFormatter(str: string): string {
  return str
    .split("-")
    .filter((word) => word !== "womens" && word !== "mens")
    .map(
      (word) =>
        `${word.charAt(0).toUpperCase()}${word.substring(1, word.length)}`
    )
    .join(" ");
}

export default categoryNameFormatter;
export { categoryNameFormatter, sidebarCategoryNameFormatter };
