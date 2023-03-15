export default function capitalizeAllWords(str: string): string {
  return str
    .split(" ")
    .filter((split) => split !== "")
    .map((word) => {
      if (word.length === 1) {
        return word.charAt(0).toLocaleUpperCase();
      }
      return `${word.charAt(0).toUpperCase()}${word.substring(1, word.length)}`;
    })
    .join(" ");
}
