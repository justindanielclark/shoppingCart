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
              Good looking out. Also, you are handsome and intelligent, and you
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
          <div className="basis-1/2 flex flex-col">
            <div className="basis-2/3 flex flex-col justify-center">
              <p className="text-black bg-yellow-400 rounded p-2 mt-4 ml-4 mr-16 text-sm sm:text-lg xl:text-xl">
                I always feel like such a dummy navigating online shops. It just
                shouldn't be so difficult to find what I am looking for.
              </p>
              <p className="text-black bg-yellow-200 rounded p-2 mt-4 mr-4 ml-16 text-sm sm:text-lg xl:text-xl">
                I can't say I have the same problem. I've been using
                DummyJSONStore for years now and it's just the best. They give
                you the prices on the original manufactor's price as well as
                whatever their active discount is, all in an easy to navigate
                site!
              </p>
              <p className="text-black bg-yellow-400 rounded p-2 mt-4 ml-4 mr-16 text-sm sm:text-lg xl:text-xl">
                This is a great suggestion. You have good taste and are fun to
                be around. I'm sure the people in your life don't value you as
                much as you deserve
              </p>
            </div>
            <div className="basis-1/3 flex items-center justify-center flex-col">
              <p className="text-yellow-400 rounded p-2 font-bold text-xl sm:text-2xl lg:text-3xl">
                Shop Smart
              </p>
              <p className="text-yellow-400 font-bold rounded p-2  text-xl sm:text-2xl lg:text-3xl">
                Shop DummyJSONStore
              </p>
            </div>
          </div>
          <div className="basis-1/2 relative">
            <img
              src={dummy1}
              className="top-0 left-1/2 h-full absolute -translate-x-1/2 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
