import React from "react";
import SVGs from "../../assets/SVGs/SVG";

type Props = {
  rating: number;
};

function StarsRating({ rating }: Props) {
  const modifiedRating = Math.ceil(rating * 2) / 2;
  const numStars = Math.floor(modifiedRating);
  const HalfStars = modifiedRating % 1;
  const starImages = [];
  for (let i = 0; i < numStars; i++) {
    starImages.push(<img className="w-4 h-4" src={SVGs.star} key={i} />);
  }
  if (HalfStars) {
    starImages.push(
      <img className="w-4 h-4" src={SVGs.halfstar} key={"halfStar"} />
    );
  }

  return <div className="flex flex-row justify-end">{starImages}</div>;
}

export default StarsRating;
