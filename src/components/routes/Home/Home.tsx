import React, { useState, useRef, useEffect } from "react";
import dummy1 from "../../../assets/images/dummy.jpg";
import dummy2 from "../../../assets/images/dummy3.jpg";

type resizeRef = {
  timer?: ReturnType<typeof setTimeout>;
  eventListener?: () => void;
};
type Orientation = "landscape" | "portrait";

function getOrientation(): Orientation {
  const { innerHeight, innerWidth } = window;
  return innerHeight > innerWidth ? "portrait" : "landscape";
}

function Home() {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation());
  const ref = useRef<resizeRef>({});
  const handleResize = () => {
    if (ref.current.timer) {
      clearTimeout(ref.current.timer);
    }
    ref.current.timer = setTimeout(() => {
      if (orientation !== getOrientation()) {
        setOrientation(getOrientation());
      }
      clearTimeout(ref.current.timer as ReturnType<typeof setTimeout>);
      ref.current.timer = undefined;
    }, 25);
  };
  useEffect(() => {
    if (ref.current.eventListener) {
      window.removeEventListener(
        "resize",
        ref.current.eventListener as () => void
      );
    }
    ref.current.eventListener = handleResize;
    window.addEventListener("resize", handleResize);
    return () => {
      if (ref.current.eventListener) {
        window.removeEventListener(
          "resize",
          ref.current.eventListener as () => void
        );
      }
      if (ref.current.timer) {
        clearTimeout(ref.current.timer);
      }
    };
  }, [orientation]);

  return (
    <div className="flex-1 h-full">
      {orientation === "portrait" ? (
        <div className="flex flex-col h-full">
          <div className="flex flex-col justify-center items-center basis-1/3">
            <p className="text-black bg-yellow-400 rounded p-2 mt-4 ml-4 mr-16 text-sm sm:text-lg lg:text-xl">
              Why does shopping online always feel like a car wreck? I wish
              there was something easier!
            </p>
            <p className="text-black bg-yellow-200 rounded p-2 mt-4 mr-4 ml-16 text-sm sm:text-lg lg:text-xl">
              I don't have that issue, I use www.dummyjsonstore.com!
            </p>
            <p className="text-black bg-yellow-400 rounded p-2 my-4 ml-4 mr-16 text-sm sm:text-lg lg:text-xl">
              Good looking out. Also you are handsome and intelligent and you
              have good taste.
            </p>
          </div>
          <div
            className="basis-1/3 flex-1"
            style={{
              backgroundImage: `url(${dummy2})`,
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="flex flex-col justify-center items-center basis-1/3 gap-4">
            <p className="text-yellow-400 rounded p-2 font-bold text-xl sm:text-2xl lg:text-3xl">
              Shop Smart
            </p>
            <p className="text-yellow-400 font-bold rounded p-2  text-xl sm:text-2xl lg:text-3xl">
              Shop DummyJSONStore
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-full">
          <div className="basis-1/2"></div>
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url(${dummy1})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Home;
