import React, { useState } from "react";
import dummy1 from "../../../assets/images/dummy.jpg";
import dummy2 from "../../../assets/images/dummy2.jpg";
import dummy3 from "../../../assets/images/dummy3.jpg"; // Landscape
import dummy4 from "../../../assets/images/dummy4.jpg";

type Props = {};
function Home({}: Props) {
  const [orientation, setOrientation] = useState(screen.orientation.type);
  return (
    <div
      className="flex-1 h-full"
      style={{
        backgroundImage: `url(${dummy1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    ></div>
  );
}

export default Home;
