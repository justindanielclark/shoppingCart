import React from "react";
import SVGs from "../../assets/SVGs/SVG";

type Props = {
  rating: number;
};

function StarsRating({ rating }: Props) {
  let numStars = Math.floor(rating);
  let HalfStars = 0;
  const modRating = rating % 1;
  if (modRating > 0.75) {
    numStars++;
  } else if (modRating > 0.35) {
    HalfStars++;
  }
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
